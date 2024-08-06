import React from 'react';

const Tile = ({ tile, isFlipped, isMatched, onClick }) => {
  return (
    <div
      className={`w-24 h-24 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 ${
        isFlipped || isMatched ? 'bg-blue-500 text-white' : 'bg-gray-300'
      } ${isMatched ? 'opacity-50' : ''}`}
      onClick={onClick}
    >
      {isFlipped || isMatched ? tile.name : '?'}
    </div>
  );
};

export default Tile;