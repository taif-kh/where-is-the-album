const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');


const prisma = new PrismaClient();

const PORT = 3000;
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

let time = 0;
let intervalId;

app.get('/play', async (req, res) => {
    let result = await prisma.characters.findMany({
        // select: {
        //     name: true,
        // },
        // data: {
        // },
    });
    res.json(result);
});

// ________

app.get('/top-users', async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      orderBy: {
        score: "desc",
      },
    });
    const topUsers = users.slice(0, 3); 
    res.json(topUsers);
  } catch (error) {
    console.error('Error fetching top users:', error);
    res.status(500).json({ error: 'Failed to fetch top users' });
  }
});
//----------------------------------------------------------------


app.get('/start-timer', (req, res) => {
  if (!intervalId) {
    intervalId = setInterval(() => {
      time += 0.005;
    }, 5);
  }
  res.json({ message: 'Timer started', time }); 
});

app.get('/get-time', (req, res) => {
  const roundedTime = time.toFixed(3);
  res.json({ time: roundedTime }); 
});

app.get('/stop-timer', (req, res) => {
  clearInterval(intervalId);
  intervalId = null;
  const finalTime = time.toFixed(3);  
  res.json({ message: 'Timer stopped', time: finalTime });
});

app.get('/reset-timer', (req, res) => {
  time = 0;
  res.json(time);
});


// _____________________________________
app.get('/reset-found', async (req, res) => {
  let result = await prisma.characters.updateMany({
    data: {isFound: false},
  })
  res.json(time);
});

// _______________________________________


app.get('/menu', async (req, res) => {
    let result = await prisma.characters.findMany({
        where: {
            isFound: false,
        }
    });

    res.json(result);
});

// ________


app.post('/register', async (req, res) => {
  let score = req.body.score;
  let { id, username } = req.body; 
  score = Math.round(parseFloat(score) * 1000) / 1000;
  let result = await prisma.users.update({
    where: { id: Number(id) },
    data: {
      name: username,
      score
    },
  });

  res.json(result);
});

//----------------------------------------------------------------  

app.get('/reset-char', async (req, res) => {
  await prisma.characters.updateMany({
    data: {
      isFound: false,
    }
  });
  res.json("All good");
});

//________________________________________________________________

app.put('/characters/:id', async (req, res) => {
    const id = req.params.id;
    let result = await prisma.characters.update({
        where: {
            id: Number(id)
        },
        data: {
            isFound: true,
        }
    });
    
    res.json(result);
});

// -------------------------- TEST --------------------------------
app.post('/characters', async (req, res) => {
    const { name, PosX, PosY } = req.body;
    let result = await prisma.characters.create({
        data: { name, PosX, PosY}
    });
    res.json(result);
});
// ----------------------------------------------------------------
app.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const mousePositionX = parseInt(req.query.mousePositionX);
      const mousePositionY = parseInt(req.query.mousePositionY);
  
      const character = await prisma.characters.findUnique({ where: { id: Number(id) } });
  
      if (!character) {
        return res.status(404).json({ error: 'Character not found' });
      }
  
      // tol = 5;
      const minX = character.PosX - 5;
      const maxX = character.PosX + 5;
      const minY = character.PosY - 5;
      const maxY = character.PosY + 5;
  
      if (
        mousePositionX >= minX && mousePositionX <= maxX &&
        mousePositionY >= minY && mousePositionY <= maxY
      ) {
        await prisma.characters.update({
          where: { id: Number(id) },
          data: { isFound: true },
        });
  
        res.status(200).json(character);
      } else {
        res.status(400).json({ error: 'Click position out of bounds' });
      }
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
//----------------------------------------------------------------  
app.post('/users', async (req, res) => {
  try {
    const user = await prisma.users.create({
      data: {}
    });
    res.json({ id: user.id }); 
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});
//----------------------------------------------------------------  


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
// npx prisma migrate dev --name init