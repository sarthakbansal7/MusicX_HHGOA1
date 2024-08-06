import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import Dashboard from './components/Dashboard';

const TOTAL_PAIRS = 6; // Assuming we have 6 pairs of tiles

const App = () => {
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0); // New state for moves
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [playerRegistered, setPlayerRegistered] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const loadLeaderboard = () => {
    const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    setLeaderboard(storedLeaderboard);
  };

  const saveLeaderboard = (newLeaderboard) => {
    localStorage.setItem('leaderboard', JSON.stringify(newLeaderboard));
    setLeaderboard(newLeaderboard);
  };

  const startGame = () => {
    if (!playerRegistered) {
      alert('Please register a player name first!');
      return;
    }
    setIsPlaying(true);
    setTime(0);
    setMatchedPairs(0);
    setMoves(0); // Reset moves
  };

  const stopGame = () => {
    if (window.confirm('Are you sure you want to stop the game?')) {
      endGame();
    }
  };

  const endGame = () => {
    setIsPlaying(false);
    if (matchedPairs === TOTAL_PAIRS) {
      const score = calculateScore();
      updateLeaderboard(currentPlayer, score);
    }
  };

  const incrementMatchedPairs = () => {
    setMatchedPairs((prev) => {
      const newMatchedPairs = prev + 1;
      if (newMatchedPairs === TOTAL_PAIRS) {
        endGame();
      }
      return newMatchedPairs;
    });
  };

  const incrementMoves = () => {
    setMoves((prev) => prev + 1);
  };

  const calculateScore = () => {
    // Lower moves means higher score
    return Math.max(10000 - moves * 100, 0);
  };

  const updateLeaderboard = (player, score) => {
    const newLeaderboard = [...leaderboard, { name: player, score }]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    saveLeaderboard(newLeaderboard);
  };

  const handlePlayerRegistration = () => {
    const name = prompt('Enter your name:');
    if (name) {
      setCurrentPlayer(name);
      setPlayerRegistered(true);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {!playerRegistered && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handlePlayerRegistration}
          >
            Register Player
          </button>
        </div>
      )}
      <GameBoard
        isPlaying={isPlaying}
        onMatchedPair={incrementMatchedPairs}
        onGameEnd={endGame}
        onTileClick={incrementMoves} // Pass incrementMoves to GameBoard
      />
      <Dashboard
        time={time}
        matchedPairs={matchedPairs}
        isPlaying={isPlaying}
        onStartGame={startGame}
        onStopGame={stopGame}
        currentPlayer={currentPlayer}
        leaderboard={leaderboard}
      />
    </div>
  );
};

export default App;
