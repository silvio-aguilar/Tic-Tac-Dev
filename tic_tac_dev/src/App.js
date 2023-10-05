import React, { useState, useEffect } from "react";
import "./App.css";
import Timer from "./Timer/Timer";
import Card from "./Card/Card";
import LevelSelect from "./LevelSelect/LevelSelect";
import Modal from "./Modal/Modal";

const cardIcons = [
  "🥹",
  "🗣️",
  "🦷",
  "🍑",
  "🌪️",
  "🌎",
  "🐷",
  "🪝",
  "⚛️",
  "🔑",
  "🥕",
  "🥑",
  "👻",
  "🥶",
  "🥵",
];

function shuffleArray(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

function App() {
  const [level, setLevel] = useState(null);
  const [board, setBoard] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    let timer;
  
    if (timerActive && timeRemaining > 0 && !showConfirmationModal) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setTimerActive(false);
      setTimeUp(true);
    }
  
    return () => {
      clearInterval(timer);
    };
  }, [timerActive, timeRemaining, showConfirmationModal]);
  

  const handleSelectLevel = (selectedLevel) => {
    setLevel(selectedLevel);
    const { rows, cols } = calculateBoardDimensions(selectedLevel);
    const totalCards = rows * cols;
    const newBoard = shuffleArray(cardIcons.slice(0, totalCards / 2).concat(cardIcons.slice(0, totalCards / 2)));
    setBoard(newBoard);
    setTimerActive(true);
    setTimeUp(false);
    setMatchedCards([]);
    setMoves(0);
    setScore(0);
  };

  const calculateBoardDimensions = (difficulty) => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (difficulty === "easy") {
      return screenWidth < screenHeight ? { rows: 4, cols: 4 } : { rows: 4, cols: 4 };
    } else if (difficulty === "medium") {
      return screenWidth < screenHeight ? { rows: 4, cols: 6 } : { rows: 6, cols: 4 };
    } else if (difficulty === "difficult") {
      return screenWidth < screenHeight ? { rows: 5, cols: 6 } : { rows: 6, cols: 5 };
    }

    // Por defecto, si no se selecciona ninguna dificultad válida, usa el nivel "easy".
    return { rows: 4, cols: 4 };
  };

  const handleTapCard = (index) => {
    if (selectedCards.length >= 2 || selectedCards.includes(index) || timeUp) return;
  
    const newSelectedCards = [...selectedCards, index];
    setSelectedCards(newSelectedCards);
  
    if (newSelectedCards.length === 2) {
      // Verificar si las dos cartas seleccionadas coinciden (compararlas por su contenido)
      const [card1, card2] = newSelectedCards;
      if (board[card1] === board[card2]) {
        // Si coinciden, agregarlas a las cartas coincidentes
        setMatchedCards([...matchedCards, card1, card2]);
        setScore(score + 2); // Incrementa el score en 2
      }
  
      setMoves(moves + 1);
  
      // Reiniciar las cartas seleccionadas después de mostrar durante 1 segundo
      setTimeout(() => {
        setSelectedCards([]);
      }, 1000);
    }
  };
  

  const handleReturnToLevelSelection = () => {
    setShowConfirmationModal(true);
  };

  const handleConfirmReturn = () => {
    setLevel(null);
    setShowConfirmationModal(false);
    setTimerActive(false);
    setTimeRemaining(60);
    setTimeUp(false);
    setMatchedCards([]);
    setMoves(0);
    setScore(0);
  };

  const handleCancelReturn = () => {
    setShowConfirmationModal(false);
  };

  const remainingPairs = (board.length / 2) - matchedCards.length;

  const handleTimeUp = () => {
    setTimerActive(false);
    setTimeUp(true);
  };

  const didPlayerWin = () => matchedCards.length === board.length;

  return (
    <div className="App">
      {level ? (
        <>
          <button onClick={handleReturnToLevelSelection}>Volver a seleccionar el nivel</button>

          <h1>{didPlayerWin() ? "¡Felicidades 🎉 has ganado!" : "Tic Tac Dev"}</h1>
          <h3>Movimientos: {moves}</h3>
          <h3>Pares restantes: {remainingPairs}</h3>

          <Timer timeLimit={60} onTimeUp={handleTimeUp} />
          <div className="board">
            {board.map((icon, index) => {
              const isTurnedOver =
                selectedCards.includes(index) || matchedCards.includes(index);
              return (
                <Card
                  key={index}
                  isTurnedOver={isTurnedOver}
                  onClick={() => handleTapCard(index)}
                >
                  {icon}
                </Card>
              );
            })}
          </div>
          {showConfirmationModal && (
            <Modal
              message="¿Estás seguro de que deseas volver a la selección de nivel?"
              onConfirm={handleConfirmReturn}
              onCancel={handleCancelReturn}
            />
          )}
          {timeUp && (
            <Modal
              message="¡Se acabó el tiempo!"
              buttonText="Volver a jugar"
              onConfirm={() => {
                handleSelectLevel(level);
                setTimeRemaining(60);
                setTimeUp(false);
              }}
            />
          )}
        </>
      ) : (
        <LevelSelect onSelectLevel={handleSelectLevel} />
      )}
    </div>
  );
}

export default App;
