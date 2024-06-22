import React from 'react';
import './Board.css';

const Board = ({ snake, food }) => {
  const renderCells = () => {
    const cells = [];
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        const isSnake = snake.some(segment => segment.x === j && segment.y === i);
        const isFood = food.x === j && food.y === i;
        const isHead = snake[0].x === j && snake[0].y === i;
        const headDirection = isHead ? snake[1] ? { x: snake[0].x - snake[1].x, y: snake[0].y - snake[1].y } : { x: 1, y: 0 } : null;
        cells.push(
          <div key={`${i}-${j}`} className={`cell ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''}`}>
            {isHead && <div className={`eyes ${getEyeDirectionClass(headDirection)}`}>
              <div className="eye"></div>
              <div className="eye"></div>
            </div>}
          </div>
        );
      }
    }
    return cells;
  };

  const getEyeDirectionClass = (direction) => {
    if (direction.x === 1) return 'right';
    if (direction.x === -1) return 'left';
    if (direction.y === 1) return 'down';
    if (direction.y === -1) return 'up';
    return '';
  };

  return <div className="board">{renderCells()}</div>;
};

export default Board;
