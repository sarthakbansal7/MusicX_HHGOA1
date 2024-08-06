import React from 'react';

const Dashboard = ({ time, matchedPairs, isPlaying, onStartGame, onStopGame, currentPlayer, leaderboard }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full md:w-1/4 p-4 bg-gray-200 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="mb-4">
        <p>Player: {currentPlayer}</p>
        <p>Time: {formatTime(time)}</p>
        <p>Matched Pairs: {matchedPairs}</p>
      </div>
      <div className="flex space-x-2 mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onStartGame}
          disabled={isPlaying}
        >
          {isPlaying ? 'Game in Progress' : 'Start New Game'}
        </button>
        {isPlaying && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onStopGame}
          >
            Stop Game
          </button>
        )}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Leaderboard</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Rank</th>
              <th className="text-left">Name</th>
              <th className="text-left">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((player, index) => (
              <tr key={index} className={currentPlayer === player.name ? 'bg-yellow-200' : ''}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;