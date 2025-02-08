import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Leaderboard() {

    const [topPlayers, setTopPlayers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/top-users')
        .then((response) => {
            setTopPlayers(response.data)
        })
        .catch(error => {
            console.error('Error starting the timer:', error);
          });
    }, []);

  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="text-white font-roboto w-screen h-screen">
        <div className="h-[0.81in] "></div>
      <h1 className="text-[89px] font-bold pl-[0.71in]">Leaderboards*</h1>
        <div className=" flex flex-col justify-start items-start">
            {/* ---------------------------------------------------------------- */}
            <div className="flex justify-between w-screen pr-[2.85in] pl-[0.76in] ">
                <p className="text-[37px]  font-normal ">Player</p>
                <p className="text-[37px] font-normal ">Time</p>
            </div>
            <div className="flex flex-col font-bold text-[67px] pr-[2.36in]">
              {topPlayers.map((player) => (
                <div key={player.id}>
                                  <div className="flex justify-between">
                  <h1 className="text-[50px] pl-[0.76in]">{player.name}</h1>
                  <h1 className="text-[50px] pr-[120px] ">{player.score}</h1>
                </div>
                                  <div className="w-[13.96in] bg-white h-[0.06in] pl-[0.76in] ml-11"></div>
                </div>
              ))}
            </div>


            {/* ---------------------------------------------------------------- */}
        </div>
        <div className="absolute bottom-[28px] left-[28px] "> <Link to="/"><button className="flex items-center justify-center gap-[15px] border-2 w-[180px] h-[64px] "> <img src="/Arrow1.png" /> <p className="text-[28px] ">Home</p>  </button></Link> </div>
        <div className="absolute bottom-[28px] right-[30px] "> <Link to="/play"><button className="flex items-center justify-center gap-[30px] border-2 w-[180px] h-[64px] "><p className="text-[28px] ">Play</p>   <img src="/Arrow1.png" className="rotate-180" />  </button></Link> </div>
      </body>
    </html>
  );
}
