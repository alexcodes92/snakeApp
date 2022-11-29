import React, { useState, useEffect, useRef } from 'react';
import './Board.css';

import BoardItem from './BoardItem';

const width=10;
const height=10;  

// I used this guide https://www.trlogic.com/blog/making-a-snake-game-using-react-hooks to help me with this task

// adds a timer with a callback
// also used this guide https://usehooks-ts.com/react-hook/use-interval to help me here
function useInterval(callback, delay) {
    const savedCallback = useRef();
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    // sets interval
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

// creates random x,y coordindates
const randomPosition = () => {
    const position = {
        x: Math.floor(Math.random()*width),
        y: Math.floor(Math.random()*height)};
    return position;    
}

// sets initial state of the board
const Board = ({ setGameStarted }) => {
    let initialRows = [];
    for (let i = 0; i < height; i++) {
        initialRows.push([]);
        for(let k=0; k<width; k++) {
            initialRows[i].push('blank');
        }
    }

    // sets initial state of the snake
    const initialSnake = [{x:0, y:0}];

    const [snake, setSnake] = useState(initialSnake);
    const [rows, setRows] = useState(initialRows);
    const [direction, setDirection] = useState('right');
    const [food, setFood] = useState(randomPosition);

    // event handler for key up event
    // detects when arrow keys are pressed and updates direction state
    const changeDirectionWithKeys = (e) => {
        var { keyCode } = e;
          switch(keyCode) {
            case 37:
                setDirection('left');
                break;
            case 38:
                setDirection('top');
                break;                   
            case 39:
                setDirection('right');
                break;
            case 40:
                setDirection('bottom');
                break;
            default:
                break;            
        }
    }

    // changes the direction that the snake is moving depending on which key is pressed and adds length to snake
    // detects if snake head hits food, if so, food is generated in new position and added length remains, if not, added length is removed
    const moveSnake = () => {
        const newSnake = [];
        switch(direction) {
            case 'bottom':
                newSnake.push({x: snake[0].x, y: (snake[0].y + 1)%width})
                break;
            case 'top':
                newSnake.push({x: snake[0].x, y: (snake[0].y - 1 + width)%width})
                break;
            case 'left':
                newSnake.push({x: (snake[0].x - 1 + height)%height, y: snake[0].y})
                break;
            case 'right':
                newSnake.push({x: (snake[0].x + 1)%height, y: snake[0].y})
        }
        snake.forEach(cell=> {
            newSnake.push(cell);
        })  
        if(snake[0].x === food.x && snake[0].y === food.y) {
            setFood(randomPosition);
        } else {
            newSnake.pop();
        }
        setSnake(newSnake);   
        displaySnake();
    }

    // displays snake and food
    const displaySnake = () => {
        const newRows = initialRows;
        snake.forEach(cell => {
            newRows[cell.x][cell.y] = 'snake';
        });
        newRows[food.x][food.y] = 'food';
        setRows(newRows);
    }

    // detects if the snake has hit itself
    // shows game over message & score and resets the game
    // I used this guide https://javascript.plainenglish.io/create-snake-game-in-react-10d7ddbff52f to help me here
    const isGameOver = () => {
        let head  = {...snake[snake.length-1]};
        for (let i=0; i<snake.length-3; i++) {
            if ((head.x === snake[i].x) &&(head.y === snake[i].y)) {
                setRows(initialRows);
                setSnake(initialSnake);
                setGameStarted(false);
                alert(`Game over: You managed a ${snake.length} long snake!`)
            }
        }
    }

    // check if the snake has hit itself each time the snake's state changes
    useEffect(() => {
        isGameOver();
    }, [snake])

    // sets the snakes initial position on the board
    // I was unsure how to get the function to run only the once on load so asked my husband who suggested using useEffect to control when the function runs
    useEffect(() => {
        displaySnake();
        document.addEventListener("keydown", changeDirectionWithKeys, false);
    }, []);

    useInterval(moveSnake, 250);

    // displays board items
    const displayRows = rows.map((row, i) =>
        <li>
            {
                row.map((boardItemType, j) => {
                    return <BoardItem key={`board-item-${i}-${j}`} type={boardItemType} />
                })
            }
        </li>
    );
 
    return (
        <ul className="board-container">
            {displayRows}
        </ul>
    )
}

export default Board;