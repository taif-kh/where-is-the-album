import { useState, useEffect } from "react";
import axios from "axios";
import ConfettiExplosion from 'react-confetti-explosion';
import Loading from "./Loading";
import './Home.css';
import { Link } from "react-router-dom";


function Home() {
  const [characters, setCharacters] = useState([]);
  const [menu, setMenu] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [itemChosen,setItemChosen] = useState(false);
  const [isValid, setIsValid] = useState(false);  // A = A
  const [isPicked, setIsPicked] = useState([]); // validate picked characters
  const [timer, setTimer] = useState();
  const [score, setScore] = useState();
  const [id, setId] = useState();
  const [visibleForm, setVisibleForm] = useState(false);
  //-----
  const [afterScore, setAfterScore] = useState();
  const [submitted, setSubmitted] = useState(false);

  

  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000 );

    return () => clearTimeout(timer);
  }, []);


  const handleMouseClick = (e) => {
    const rect = e.target.getBoundingClientRect();  // get size of the image and its position relative to the viewport 
    
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100; // Get percentage of the image's dimensions
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100; 
    
    setMousePosition({
      x: mouseX,
      y: mouseY,
    });
  
    setIsVisible(true);

    
    axios.get('http://localhost:3000/menu')
      .then(response => {
        setMenu(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the menu!', error);
      });
  };




//----------------------------------------------------------------
useEffect(() => {
    axios.post('http://localhost:3000/users')
      .then((response) => {
        console.log(response.data.id);
        setId(response.data.id);
      })
      .catch(error => {
        console.error('There was an error stopping the timer!', error);
      });

     
  }, []);
//----------------------------------------------------------------  

useEffect(() => {
  axios.get('http://localhost:3000/play')
  .then(response => {
    console.log(response.data); 
    setCharacters(response.data);
  })
  .catch(error => {
    console.error('There was an error fetching the characters!', error);
  });
}, [isPicked]);



  useEffect(() => {

    // ------------------------



    axios.get('http://localhost:3000/reset-timer')
    .then(response => {
      setTimer(response.data.time)
    })
    .catch(error => {
      console.error('There was an error fetching the characters!', error);
    });

    setScore(null);
    

  }, []);
  

  useEffect(() => {
    if (characters.length > 0 && isPicked.length === characters.length) {
      setVisibleForm(true);
    }
  }, [isPicked, characters]);
  
const handleChoice = async (id) => {
  setItemChosen(true);

  try {
    const response = await axios.get(`http://localhost:3000/${id}`, {
      params: {
        mousePositionX: mousePosition.x,
        mousePositionY: mousePosition.y
      },
    });

    if (response.status === 200) {
      setIsValid(true);

      const character = response.data;

      setIsPicked(prevPicked => [...prevPicked, character]);
    } else {
      setIsValid(false);
    }
  } catch (error) {
    console.error("Error validating character:", error);
    setIsValid(false);
  }
};



    const startTimer = () => {
      axios.get('http://localhost:3000/start-timer')
        .then(response => {
          setTimer(response.data.time); 
        })
        .catch(error => {
          console.error('Error starting the timer:', error);
        });

        if(isPicked.length !== characters.length) {
      const interval = setInterval(() => {
        axios.get('http://localhost:3000/get-time')
          .then(response => {
            setTimer(response.data.time); 
          })
          .catch(error => {
            console.error('Error fetching the current time:', error);
          });
      }, 5);
    }
    };
    

    if(isPicked.length === characters.length) {
            // setVisibleForm(true);

      axios.get('http://localhost:3000/stop-timer')
      .then((response) => {
        console.log(response.data.message);
        setScore(response.data.time);
        // setTimer(0);
      })
      .catch(error => {
        console.error('There was an error stopping the timer!', error);
      });

    };


// ----------------------------------------------------------------
    const handleSubmit = (e) => {
      e.preventDefault(); 
    
      const formData = new FormData(e.target); 
      const data = Object.fromEntries(formData.entries());
    
      axios.post('http://localhost:3000/register', data)
        .then((response) => {
          setAfterScore(response.data.score);
          setSubmitted(true);
        })
        .catch((error) => {
          console.error('There was an error submitting the form!', error);
        });

        axios.get('http://localhost:3000/reset-char')
        .then((response) => {
          console.log('Reset', response.data);
        })
        .catch((error) => {
          console.error('There was an error', error);
        });
    };
    


  return (
    <html>
    <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
  </head> 
  {loading ? (
        <Loading />
      ) : "" }
    <body className={`flex justify-between items-center bg-[#1E1E1E] text-white w-screen h-screen font-roboto`}>


      <div className={` w-1/2 h-full flex flex-col `}>
        
        <div className="flex justify-center w-[300px]">
            <div className=" flex justify-between border-2 w-full">
              <Link to="/">            <button type="submit" className="w-[146.81px] h-[27px] "><u>Home</u></button>              </Link>
            <div className="h-full w-1 bg-white"></div>
            <Link to="/leaderboard">            <button type="submit" className="w-[146.81px] h-[27px]"><u>Leaderboards</u></button>            </Link>
            </div>   
              </div> 
        <div className="w-full h-[1.18in]"></div>
        <div className="flex flex-col items-start pl-[1.1in] ">
          <h2 className="font-[28px]">Find these: </h2>

          {characters.map((character) => 
  character.isPicked ? (
    <div key={character.id} className="flex w-[250px] items-center relative">
    <p className="font-bold text-[37px] text-white relative z-10">- {character.name}</p>
    <div className="bg-white h-1 w-full absolute top-1/2 transform -translate-y-1/2 z-0"></div>
  </div>
  ) : (
    <p className='font-bold text-[37px]' key={character.id}>- {character.name} <button onClick={() => {setVisibleForm(!visibleForm)}} className="text-blue-400">Change</button>            </p>
  )

        )}
        </div>

        {/* ----------------------------- */}

        {/* --------SECTION 2/ TIMER AND BUTTON------------ */}
        <div className="flex flex-col items-center h-full ">
    
        {visibleForm ? (

  <div className="flex flex-col w-1/2 h-full items-center justify-center">

    <div className="flex pl-4">    <h1>Congratulations!</h1> <div className="w-4"></div> <img src="/confetti.png" className="w-10 h-10" />  <ConfettiExplosion />   </div>
    <div className="flex pl-9 w-full">    <h1>Your score: {score ? score : "0.000"}</h1>    </div>
    <br />


    {submitted ? (
      <div className=" flex flex-col items-center">
      <h2>Thank you for playing</h2>
      <div className="flex flex-col justify-between w-[300px]">
        <div className="h-3 w-full"></div>
            <div className=" flex justify-center  w-full">
              <Link to="/">            <button type="submit" className="justify-self-start h-[27px] "><u>Go back home</u></button>              </Link>

            </div>   
              </div> 
                  </div>) : (
              <form onSubmit={handleSubmit} className="flex flex-col text-white">
            <input type="hidden" name="id" value={id} />
            <label>Name</label>
            <input type="text" name="username" className="text-black border-2 border-white"/>
            <label>Score</label>
            <input type="string" name="score" value={score} placeholder={score}  className="border-2 text-black border-white"/>
            <br />
            <button type="submit" className="border-2">Submit</button>
            </form>
            )}
            <br />

</div>
) : (
<div className=" w-full h-full flex flex-col justify-center items-center">

    <button
      className="self-center w-[2.29in] bg-white text-black h-[0.89in] rounded-[26px] font-bold shadow-black shadow-lg drop-shadow-lg hover:bg-blue-400"
      onClick={startTimer}
    >
      <h2>START</h2>
    </button>

    <div className="h-[0.31in] w-full"></div>
    <h2 className="font-bold self-center text-[37px]">Timer: {timer > 0 ? timer : "0.000"}</h2>


  </div>
)}
  

  </div>
</div>
      {/* </div> */}

{/* ---------------------------------------------------------------------------------------------------------------------------------------------- */}
      <div className={`relative w-1/2 h-screen `}>
      <img
    className="w-full h-full" // Ensures the image takes full width and maintains its aspect ratio
    src="5.png"
    onClick={handleMouseClick}
    onMouseMove={() => {
      setIsVisible(false);
      setItemChosen(false);
      setIsValid(false);
    }}
  />
        {isVisible && (
          <div
            className="absolute flex flex-col items-center w-[350px] h-[350px] bg-transparent justify-between z-20"
            style={{
              top: `calc(${mousePosition.y}% - 25px)`, 
              left: `calc(${mousePosition.x}% - 25px)`,
            }}          >

            <div className=" h-[200px] w-[200px] bg-white rounded-lg text-black flex flex-col z-30 absolute top-10 left-8 shadow-2xl drop-shadow-2xl">

              {menu
              .map((character) => (
                <button
                  key={character.id}
                  onClick={() => handleChoice(character.id)}
                  // bg-[#B4B4B4] 
                  className={`h-10 font-bold text-[#191919] rounded-t-lg ${itemChosen ? (isValid ? "bg-green-600" : "bg-red-600") : "bg-gray-400"}`}
                  >
                  {character.name}
                </button>
              ))}


            </div>
          </div>
        )}
        {/* ---------------------------------------------------------------- */}


      </div>


    </body>
    </html>
  );
}

export default Home;

