import React, { useState, useEffect } from 'react';
import Board from './Board';
import './Game.css';

const Game = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(
    localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0
  );

  const handleKeyDown = (event) => {
    if (event.key === ' ' && !gameStarted) {
      startGame();
    }
    if (!gameStarted) return;

    switch (event.key) {
      case 'ArrowUp':
        if (direction.y === 0) setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        if (direction.y === 0) setDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        if (direction.x === 0) setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        if (direction.x === 0) setDirection({ x: 1, y: 0 });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, direction]);

  useEffect(() => {
    if (gameOver || !gameStarted) return;

    const moveSnake = () => {
      setSnake((prev) => {
        const newSnake = [...prev];
        const head = newSnake[0];
        const newHead = { x: head.x + direction.x, y: head.y + direction.y };

        if (newHead.x === food.x && newHead.y === food.y) {
          setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
          setScore(score + 1);
        } else {
          newSnake.pop();
        }

        if (
          newHead.x < 0 || newHead.y < 0 || newHead.x >= 20 || newHead.y >= 20 ||
          newSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
        ) {
          setGameOver(true);
          setGameStarted(false);
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('highScore', score);
          }
          return prev;
        }

        newSnake.unshift(newHead);
        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [direction, food, gameOver, gameStarted, score, highScore]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 1, y: 0 });
    setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
  };

  return (
    <div className="game-container">
      <h1>Snake Game</h1>
      <h2>Score: {score}</h2>
      <h2>High Score: {highScore}</h2>
      {gameOver && <h2>Game Over</h2>}
      {!gameStarted && !gameOver && <h2>Press Space to Play</h2>}
      <Board snake={snake} food={food} />
      {gameOver && (
        <button onClick={startGame} className="restart-button">
          Restart
        </button>
      )}
    </div>
  );
};

export default Game;
