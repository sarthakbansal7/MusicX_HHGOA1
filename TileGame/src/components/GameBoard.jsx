import React, { useState, useEffect, useRef } from 'react';
import Tile from '../Tile';

const songs = [
  { id: 1, name: 'Song 1', audio: './Dope.mp3' },
  { id: 2, name: 'Song 2', audio: './Dope.mp3' },
  { id: 3, name: 'Song 3', audio: './Dope.mp3' },
  { id: 4, name: 'Song 4', audio: './Dope.mp3' },
  { id: 5, name: 'Song 5', audio: './Dope.mp3' },
  { id: 6, name: 'Song 6', audio: './Dope.mp3' },
];

const GameBoard = ({ isPlaying, onMatchedPair, onGameEnd, onTileClick }) => {
  const [tiles, setTiles] = useState([]);
  const [flippedTiles, setFlippedTiles] = useState([]);
  const [matchedTiles, setMatchedTiles] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (isPlaying) {
      const shuffledTiles = [...songs, ...songs]
        .sort(() => Math.random() - 0.5)
        .map((song, index) => ({ ...song, id: index }));
      setTiles(shuffledTiles);
      setFlippedTiles([]);
      setMatchedTiles([]);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (matchedTiles.length === songs.length * 2) {
      onGameEnd();
    }
  }, [matchedTiles, onGameEnd]);

  const playAudio = (audioSrc) => {
    audioRef.current.src = audioSrc;
    audioRef.current.play();
    setIsAudioPlaying(true);
  };

  const stopAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsAudioPlaying(false);
  };

  const handleTileClick = (clickedTile) => {
    if (isAudioPlaying) {
      setFlippedTiles([]);
      setIsChecking(false);
      stopAudio()
    }

    if (
      isChecking ||
      flippedTiles.length === 2 ||
      matchedTiles.includes(clickedTile.id) ||
      flippedTiles.some(tile => tile.id === clickedTile.id)
    ) {
      return;
    }

    onTileClick(); // Increment moves

    // Play the audio of the clicked tile
    playAudio(clickedTile.audio);

    const newFlippedTiles = [...flippedTiles, clickedTile];
    setFlippedTiles(newFlippedTiles);

    if (newFlippedTiles.length === 2) {
      setIsChecking(true);
      if (newFlippedTiles[0].name === newFlippedTiles[1].name) {
        setMatchedTiles(prev => [...prev, newFlippedTiles[0].id, newFlippedTiles[1].id]);
        onMatchedPair();
        setTimeout(() => {
          setFlippedTiles([]);
          setIsChecking(false);
          // Stop the audio after the match is confirmed
          stopAudio();
        }, 5000);
      } else {
        setTimeout(() => {
          setFlippedTiles([]);
          setIsChecking(false);
          // Stop the audio if no match
          stopAudio();
        }, 5000);
      }
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow-lg">
      {tiles.map((tile) => (
        <Tile
          key={tile.id}
          tile={tile}
          isFlipped={flippedTiles.some((t) => t.id === tile.id)}
          isMatched={matchedTiles.includes(tile.id)}
          onClick={() => handleTileClick(tile)}
        />
      ))}
    </div>
  );
};

export default GameBoard;
