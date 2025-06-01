'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Typewriter from 'typewriter-effect'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const AlphabetTypingTest = () => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load best time from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('alphabet-typing-best-time');
    if (saved) {
      setBestTime(parseFloat(saved));
    }
  }, []);

  // Update timer during gameplay
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && startTime) {
      timer = setInterval(() => {
        setCurrentTime((Date.now() - startTime) / 1000);
      }, 10); // Update every 10ms for smooth display
    }
    return () => clearInterval(timer);
  }, [gameState, startTime]);

  const startGame = () => {
    setGameState('playing');
    setUserInput('');
    setStartTime(Date.now());
    setEndTime(null);
    setCurrentTime(0);
    inputRef.current?.focus();
  };

  const finishGame = useCallback(() => {
    if (!startTime) return;
    
    const finalTime = (Date.now() - startTime) / 1000;
    setEndTime(Date.now());
    setCurrentTime(finalTime);
    setGameState('finished');
    
    // Check if it's a new best time
    if (!bestTime || finalTime < bestTime) {
      setBestTime(finalTime);
      localStorage.setItem('alphabet-typing-best-time', finalTime.toString());
    }
  }, [startTime, bestTime]);

  const resetGame = () => {
    setGameState('idle');
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setCurrentTime(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameState !== 'playing') return;

    const value = e.target.value.toUpperCase();
    
    // Only allow valid alphabet characters and prevent going beyond alphabet length
    const validInput = value.split('').filter((char, index) => {
      return char === ALPHABET[index] && index < ALPHABET.length;
    }).join('');

    setUserInput(validInput);

    // Check if alphabet is complete
    if (validInput === ALPHABET) {
      finishGame();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Start game on first keystroke if idle
    if (gameState === 'idle' && e.key.match(/[a-zA-Z]/)) {
      setStartTime(Date.now());
      setGameState('playing');
    }
  };

  const renderAlphabet = () => {
    return (
      <div className="alphabet-letters-container">
        {ALPHABET.split('').map((letter, index) => {
          let className = 'alphabet-letter';
          
          if (index < userInput.length) {
            className += ' typed';
          } else if (index === userInput.length && gameState === 'playing') {
            className += ' current';
          } else {
            className += ' pending';
          }
          
          return (
            <span key={index} className={className}>
              {letter}
            </span>
          );
        })}
      </div>
    );
  };

  const formatTime = (time: number) => {
    return time.toFixed(3) + 's';
  };

  if (gameState === 'idle') {
    return (
      <div className="alphabet-game-wrapper">
        <div className="game-content">
          <h3 className="game-title">Type The Alphabet A-Z</h3>
          <p className="game-subtitle">How fast can you type the alphabet? Timer starts when you begin typing.</p>
          
          <div className="alphabet-display">
            {renderAlphabet()}
          </div>
          
          <div className="time-display">
            <div className="time-item">
              <span className="time-label">Your Best Time:</span>
              <span className="time-value">
                {bestTime ? formatTime(bestTime) : 'Not set'}
              </span>
            </div>
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Click here and start typing the alphabet..."
            className="alphabet-input"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck="false"
          />
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    return (
      <div className="alphabet-game-wrapper">
        <div className="game-content">
          <h3 className="game-title">Type The Alphabet A-Z</h3>
          
          <div className="alphabet-display">
            {renderAlphabet()}
          </div>
          
          <div className="time-display">
            <div className="time-item current-time">
              <span className="time-label">Time:</span>
              <span className="time-value">{formatTime(currentTime)}</span>
            </div>
            <div className="time-item">
              <span className="time-label">Best:</span>
              <span className="time-value">
                {bestTime ? formatTime(bestTime) : 'Not set'}
              </span>
            </div>
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            className="alphabet-input"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck="false"
            autoFocus
          />
        </div>
      </div>
    );
  }

  // Finished state
  return (
    <div className="alphabet-game-wrapper">
      <div className="game-content">
        <h3 className="game-title">Alphabet Complete! 🎉</h3>
        
        <div className="alphabet-display">
          {renderAlphabet()}
        </div>
        
        <div className="time-display">
          <div className="time-item final-time">
            <span className="time-label">Your Time:</span>
            <span className="time-value">{formatTime(currentTime)}</span>
          </div>
          <div className="time-item">
            <span className="time-label">Best Time:</span>
            <span className="time-value">
              {bestTime ? formatTime(bestTime) : formatTime(currentTime)}
            </span>
          </div>
        </div>
        
        {bestTime === currentTime && bestTime !== null && (
          <div className="new-record">🏆 New Personal Best!</div>
        )}
        
        <button onClick={resetGame} className="play-again-btn">
          <i className="fas fa-redo mr-2"></i>Try Again
        </button>
      </div>
    </div>
  );
};

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="container mx-auto max-w-5xl text-center relative z-10">
        {/* Main Content */}
        <div className="hero-content">
          {/* Typewriter Section */}
          <div className="typewriter-container">
            <div className="typewriter-bg"></div>
            <div className="typewriter-content">
              <div className="typewriter-text">
                <h1 className="typewriter-heading">
                  <Typewriter
                    options={{
                      strings: [
                        'Hello! I\'m Akash.',
                        'I love tinkering with tech.',
                        'I make systems work together.',
                        'Network enthusiast.',
                        'IoT & hardware explorer.',
                        'I speak Python, SQL & C#.',
                        'Cloud architecture enthusiast.',
                        'I turn complex tech into clear solutions.'
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 75,
                      deleteSpeed: 50,
                    }}
                  />
                </h1>
              </div>
            </div>
          </div>

          {/* Alphabet Typing Test Game */}
          <AlphabetTypingTest />
        </div>
      </div>
    </section>
  )
}