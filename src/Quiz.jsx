import React, { useState } from "react";
import quiz from "./data/quiz";

function Quiz() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  function handleClick(choice) {
    if (choice === quiz[questionIndex].correctAnswer) {
      setScore(score + 1);
    }
    setQuestionIndex(questionIndex + 1);
  }

  function handleReset() {
    setQuestionIndex(0);
    setScore(0);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-8">
      <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
        🎯 Quiz en React 🎯
      </h2>

      <h3 className="text-lg sm:text-xl text-gray-600 mb-2 sm:mb-4 text-center">
        Score : {score} / {quiz.length}
      </h3>

      {questionIndex < quiz.length ? (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg text-center w-full max-w-lg sm:max-w-2xl">
          <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
            {quiz[questionIndex].question}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
            {quiz[questionIndex].choices.map((choice, index) => (
              <button
                key={index}
                className="bg-yellow-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-yellow-600 transition w-full text-base sm:text-lg"
                onClick={() => handleClick(choice)}
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg text-center w-full max-w-xs sm:max-w-md">
          <h2 className="text-xl sm:text-2xl font-bold text-green-600">🎉 Fin de partie !</h2>
          <button
            className="bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition mt-4 w-full"
            onClick={handleReset}
          >
            🔄 Recommencer
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;