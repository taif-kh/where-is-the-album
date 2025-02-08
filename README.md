

# Where is the Album? 🎵

**A Fun and Nostalgic Music Trivia Game**

"Where is the Album?" is an interactive web-based game that tests users’ knowledge of iconic music albums from the past decade. Players match album names to their corresponding covers as quickly as possible, competing for a spot on the leaderboard.

---

## ✨ **Features**

- **Album Matching Challenge:** Users click on album covers to reveal a list of names and must match the correct album name to its cover.
- **Timer-Based Gameplay:** A timer starts when the game begins and stops when the user completes the challenge, encouraging quick thinking and accuracy.
- **Leaderboard:** Players who finish in the top 5 can enter their names and claim a spot on the website’s leaderboard.
- **Nostalgic Theme:** The game features albums from popular artists like **Sia**, **Imagine Dragons**, **Maroon 5**, **Coldplay**, and **Fetty Wap**, bringing a sense of nostalgia to music lovers.

---

## 🛠️ **Technologies Used**

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (Prisma)
- **Other Tools:** JavaScript, HTML, CSS

---

## 🚀 **Getting Started**

### Prerequisites
- Node.js and MongoDB installed.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/taif-kh/where-is-the-album.git
   ```
2. Install dependencies for the frontend and backend:
   ```bash
    cd where-is-the-album/frontend
    npm install
    cd ../backend
    npm install
   ```
3. Set up Prisma:
- Install the Prisma CLI globally (if not already installed):

    ```bash
    npm install -g prisma
    ```
- Generate the Prisma client:

    ```bash
    npx prisma generate
    ```
- Apply database migrations:

    ```bash
    npx prisma migrate dev --name init
    ```

4. Configure environment variables:

- Copy .env.example to .env:
    ```bash
    cp .env.example .env
    ```
- Open .env and fill in the required values:
 Replace [user], [password], [hostname], and [dbname] in DATABASE_URL with your PostgreSQL credentials.
5. Start the backend and frontend:
   ```bash
    node --watch app.js
    cd ../frontend
    npm run dev
   ```

## 📂 Project Structure

```bash
where-is-the-album/
├── backend/             # Backend API (Node.js, Express.js)
│   ├── prisma/          # Prisma schema and migrations
│   ├── .env.example     # Environment variables template
│   ├── app.js           # Entry point for the backend
│   └── package.json     # Backend dependencies
├── frontend/            # Demo client (React.js)
│   ├── public/          # Static assets
│   ├── src/             # Source code for the frontend
│   │   └── App.jsx      # Main application file
│   └── package.json     # Frontend dependencies
└── README.md            # Project documentation
```

## 📄 **License**

This project is licensed under the **MIT License**. For more details, see <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener">https://opensource.org/licenses/MIT</a>.

## 🙏 Acknowledgments

- React.js and Tailwind CSS for building a responsive and interactive frontend.
- MongoDB for storing leaderboard data.
- The music community for inspiring this nostalgic project.

Made with ❤️ by Taif Khaskhoussi. Let's connect on <a href="https://www.linkedin.com/in/taif-khaskhoussi/" target="_blank" rel="noopener">LinkedIn</a>!