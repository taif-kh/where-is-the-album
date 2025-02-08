import axios from "axios";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const Home = () => {

  useEffect(() => {
    axios.get("http://localhost:3000/reset-found")
    .then((response) => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('There was an error stopping the timer!', error);
    });

  }, []);

  return (
    
<html>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
  </head>

<body className={` text-white font-inter`} >
      
    <div className="flex">
        <div className="w-1/2 flex-col h-screen ">
          <div className="flex flex-col w-full h-screen">
<div className="h-[3.22in] "></div>
             <h1 className="font-bold pl-[0.64in] ">Where is the album?</h1> 
            <div className="h[0.34in]"></div>
            <h2 className="pl-[0.64in] ">Find the album’s name,   </h2>    
            <h2 className="pl-[0.64in] "> as fast as possible.</h2>
            <div className="h-[0.97in] "></div>
            <div className="pl-[1.76in]">
              <Link to="/play">            <button className=" w-[2.29in] bg-white text-black h-[0.89in] rounded-[26px] font-bold shadow-black shadow-lg drop-shadow-lg hover:bg-[#DA0703] "><h2>PLAY</h2></button>              </Link>
            </div>
            <div className=" h-[2.53in]"></div>
            <div className="h-[0.46in] flex items-start pl-[0.64in] "><p>Project by: Taif Kh.</p></div>

          </div>
        </div>
        {/* ---------------------------------------------------------------- */}
        <div>
          <img src="/3.png" className="h-screen object-fill" />
        </div>
      </div>
      <div className="absolute bottom-[28px] right-[30px] "> <Link to="/leaderboard"><button className="flex items-center justify-center gap-[30px] border-2 w-[280px] h-[64px] "><p className="text-[28px] ">Leaderboards</p>   <img src="/Arrow1.png" className="rotate-180" />  </button></Link> </div>
    </body>
          {/* )} */}
</html>
   );
};

export default Home;
