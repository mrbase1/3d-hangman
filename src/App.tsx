import React, { useState, useEffect } from "react";
import HangmanGame from "./components/HangmanGame";
import Keyboard from "./components/Keyboard";
import CategorySelector from "./components/CategorySelector";
import { Skull, Trophy, XCircle } from "lucide-react";
import { WordCategory } from "./types/categories";
import { generateWord } from "./utils/wordGenerator";

// Maximum number of incorrect guesses allowed
const MAX_MISTAKES = 6;

function App() {
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing",
  );
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [shouldResetConfetti, setShouldResetConfetti] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    null,
  );
  const [gameStarted, setGameStarted] = useState(false);

  // Update stats when game status changes
  useEffect(() => {
    if (gameStatus === "won") {
      setWins((prev) => prev + 1);
      setCurrentStreak((prev) => prev + 1);
      setBestStreak((prev) => Math.max(prev, currentStreak + 1));
    } else if (gameStatus === "lost") {
      setLosses((prev) => prev + 1);
      setCurrentStreak(0);
    }
  }, [gameStatus]);

  // Handle category selection
  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  // Start a new game
  const startNewGame = () => {
    if (!selectedCategory && !gameStarted) {
      // If no category is selected or it's "random", and game hasn't started, do nothing
      return;
    }

    // Generate a random word based on the selected category
    const randomWord = generateWord(selectedCategory);

    setWord(randomWord);
    setGuessedLetters([]);
    setMistakes(0);
    setGameStatus("playing");
    setGameStarted(true);
    setShouldResetConfetti(true);

    // Reset the flag after a short delay to allow the component to respond
    setTimeout(() => {
      setShouldResetConfetti(false);
    }, 100);
  };

    // Start game when category is selected for the first time
    useEffect(() => {
      if (selectedCategory && !gameStarted) {
        startNewGame()
      }
    }, [selectedCategory])

  // Handle letter guesses
  const handleGuess = (letter: string) => {
    if (gameStatus !== "playing" || guessedLetters.includes(letter)) {
      return;
    }

    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);

    // Check if the guessed letter is in the word
    if (!word.includes(letter)) {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);

      // Check if the player has lost
      if (newMistakes >= MAX_MISTAKES) {
        setGameStatus("lost");
      }
    } else {
      // Check if the player has won
      const isWordGuessed = word
        .split("")
        .every((char) => newGuessedLetters.includes(char) || char === ' ');

      if (isWordGuessed) {
        setGameStatus("won");
      }
    }
  };

  // Display the word with guessed letters revealed and others hidden
  const maskedWord = word
    .split("")
    .map((letter) => {
      if (letter === " ") {
        return " ";
      }
      return guessedLetters.includes(letter) ? letter : "_";
    })
    .join("");

  // Get streak color based on current streak
  const getStreakColor = () => {
    if (currentStreak === 0) return "text-gray-400";
    if (currentStreak < 3) return "text-blue-400";
    if (currentStreak < 5) return "text-green-400";
    if (currentStreak < 8) return "text-yellow-400";
    return "text-orange-400 animate-pulse";
  };

  return (
    <div
      className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-between py-8 px-4"
      data-oid="m3cdw3q"
    >
      <div className="text-center" data-oid=".hosyzo">
        <h1
          className="text-4xl font-bold mb-2 flex items-center justify-center"
          data-oid="9_ytxqv"
        >
          Base1's 3D Hangman <Skull className="ml-2" size={32} data-oid="vr79zze" />
        </h1>
        <p className="text-gray-400 mb-4" data-oid=".t4cxmi">
          Guess the word before the hangman is complete!
        </p>

        {/* Game Stats */}
        {gameStarted && (
          <div
            className="flex flex-wrap justify-center gap-4 md:gap-6 mb-4"
            data-oid="j6tj4me"
          >
            <div className="flex items-center" data-oid="ld7iews">
              <Trophy
                className="text-green-500 mr-2"
                size={20}
                data-oid="3qi4vyk"
              />

              <span data-oid="-t34tjp">Wins: {wins}</span>
            </div>
            <div className="flex items-center" data-oid="i8udqu0">
              <XCircle
                className="text-red-500 mr-2"
                size={20}
                data-oid="ki:son0"
              />

              <span data-oid="c4knlb8">Losses: {losses}</span>
            </div>
            <div
              className={`flex items-center ${getStreakColor()}`}
              data-oid="u_.eh50"
            >
              <span data-oid="j9ab4ev">Current Streak: {currentStreak}</span>
            </div>
            <div
              className="flex items-center text-purple-400"
              data-oid="-jkgzai"
            >
              <span data-oid="wamtqp_">Best Streak: {bestStreak}</span>
            </div>
          </div>
        )}
      </div>

      <div
        className="w-full max-w-4xl flex flex-col items-center"
        data-oid="rp3q6xc"
      >
        {!gameStarted ? (
          // Category selection screen
          <CategorySelector
            onSelectCategory={handleCategorySelect}
            selectedCategory={selectedCategory}
            data-oid="6l090u."
          />
        ) : (
          // Game screen
          <>
            {/* 3D Hangman Visualization */}
            <div
              className="w-full h-[400px] mb-8 bg-gray-800 rounded-lg overflow-hidden"
              data-oid="d6:2t5h"
            >
              <HangmanGame
                mistakes={mistakes}
                gameStatus={gameStatus}
                resetConfetti={shouldResetConfetti}
                data-oid="snxe-f4"
              />
            </div>

            {/* Game Status */}
            <div className="text-center mb-8" data-oid="snqq9-6">
              <div
                className="text-3xl font-mono tracking-wider mb-4"
                data-oid=":r70job"
              >
                {maskedWord}
              </div>

              {gameStatus === "won" && (
                <div
                  className="text-green-500 text-2xl font-bold mb-4"
                  data-oid="rp9s9ee"
                >
                  You won! 🎉
                </div>
              )}

              {gameStatus === "lost" && (
                <div
                  className="text-red-500 text-2xl font-bold mb-4"
                  data-oid="tf6epib"
                >
                  You lost! The word was: {word}
                </div>
              )}

              <div className="text-gray-400" data-oid="zgnn:-3">
                Mistakes: {mistakes} / {MAX_MISTAKES}
              </div>
            </div>

            {/* Keyboard */}
            <Keyboard
              guessedLetters={guessedLetters}
              onGuess={handleGuess}
              disabled={gameStatus !== "playing"}
              word={word}
              data-oid="4jm7fvu"
            />
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4" data-oid="csiej0p">
        {gameStarted && (
          <button
            onClick={startNewGame}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-bold transition-colors"
            data-oid="vy2mfxo"
          >
            {gameStatus === "playing" ? "New Word" : "Play Again"}
          </button>
        )}

        {gameStarted && (
          <button
            onClick={() => {
              setGameStarted(false);
              setSelectedCategory(null);
              setShouldResetConfetti(true);
            }}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold transition-colors"
            data-oid="x8k4bcw"
          >
            Change Category
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
