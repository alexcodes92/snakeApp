import React from 'react';
import './BoardButtons.css';

const BoardButtons = ({ setGameStarted, setNeedHelp }) => {
    return (
        <ul className="buttons">
          <li>
            <button onClick={() => setGameStarted(true)}>Start Game</button>
            <button onClick={() => setNeedHelp(true)}>Help</button>
          </li>
        </ul>
    );
}

export default BoardButtons;