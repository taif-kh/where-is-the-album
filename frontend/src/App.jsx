import { Routes, Route } from 'react-router-dom';
import Game from './Game';
import Home from './Home';
import Leaderboard from './Leaderboard';

export default function App() {
  return ( 
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/play' element={<Game />} />
      <Route path='/leaderboard' element={<Leaderboard />} />
    </Routes>
  );
}
