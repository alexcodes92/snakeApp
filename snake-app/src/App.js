import React, { useState } from 'react';
import './App.css';
import Board from './Components/Board';
import Help from './Components/Help';
import BoardButtons from './Components/BoardButtons';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [needHelp, setNeedHelp] = useState(false);

  return (
    <div className="App">
      <h1>Snake</h1>

      {!gameStarted && (
        <BoardButtons setGameStarted={setGameStarted} setNeedHelp={setNeedHelp}  />
      )}
      
      {gameStarted && (
        <Board setGameStarted={setGameStarted} />
      )}

      {needHelp && (
        <Help />
      )}
    </div>
  );
}

export default App;
