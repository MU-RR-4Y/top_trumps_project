import './App.css';
import GameContainer from './Containers/GameContainer';
import { useState } from 'react';

function App() {

  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState("Player");

  const handlePlayerNameChange = (e) => {
    setPlayerName(e.target.value);
  }

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <>
      {!gameStarted ? 
        <div className="home-page">
          <h1>Please enter your name:</h1>
          <input type="text" id="player-name" placeholder="Player" onChange={handlePlayerNameChange}></input>
          <div className="start-game">
            <h1 onClick={handleStartGame}>Start</h1>
          </div>
        </div>
      :
        <GameContainer playerName={playerName}/>
      }
    </>
  );
};

export default App;
