import React from "react";

interface KeyboardProps {
  guessedLetters: string[];
  onGuess: (letter: string) => void;
  disabled: boolean;
  word: string;
}

const Keyboard: React.FC<KeyboardProps> = ({
  guessedLetters,
  onGuess,
  disabled,
  word,
}) => {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  // Handle keyboard key press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (/^[A-Z]$/.test(key) && !disabled) {
        onGuess(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onGuess, disabled]);

  const getKeyClass = (letter: string) => {
    if (guessedLetters.includes(letter)) {
      return word.includes(letter)
        ? "bg-green-600 text-white cursor-default"
        : "bg-red-600 text-white cursor-default";
    }
    return "bg-gray-700 hover:bg-gray-600 text-white";
  };

  return (
    <div className="w-full max-w-3xl" data-oid="uwj.6be">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex justify-center mb-2"
          data-oid="r.i50o8"
        >
          {row.map((letter) => (
            <button
              key={letter}
              className={`${getKeyClass(letter)} m-1 w-10 h-12 rounded font-bold transition-colors`}
              onClick={() => onGuess(letter)}
              disabled={guessedLetters.includes(letter) || disabled}
              data-oid="vj5c3ct"
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
