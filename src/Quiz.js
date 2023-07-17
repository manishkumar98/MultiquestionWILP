import React, { useState } from "react";

const questions = [
  {
    id: 1,
    question: "Question 1: What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: ["Paris"]
  },
  {
    id: 2,
    question: "Question 2: Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: ["Mars"]
  },
  {
    id: 3,
    question: "Question 3: Which colors are in the rainbow?",
    options: ["Red", "Green", "Blue", "Yellow"],
    correctAnswer: ["Red", "Blue", "Yellow"]
  }

  // Add more questions here
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const handleOptionSelect = (option) => {
    const selectedOptions = [...selectedAnswers];
    const index = selectedOptions.indexOf(option);

    if (index > -1) {
      selectedOptions.splice(index, 1);
    } else {
      selectedOptions.push(option);
    }

    setSelectedAnswers(selectedOptions);
  };

  const handleNextQuestion = () => {
    const currentCorrectAnswers = questions[currentQuestion].correctAnswer;
    const isAnswerCorrect =
      selectedAnswers.length === currentCorrectAnswers.length &&
      selectedAnswers.every((answer) => currentCorrectAnswers.includes(answer));

    if (isAnswerCorrect) {
      setScore(score + 1);
    }

    setSelectedAnswers([]);
    setCurrentQuestion(currentQuestion + 1);
  };

  const renderOptions = () => {
    const { options } = questions[currentQuestion];

    return options.map((option, index) => (
      <div key={index}>
        <input
          type="checkbox"
          checked={selectedAnswers.includes(option)}
          onChange={() => handleOptionSelect(option)}
        />
        <label>{option}</label>
      </div>
    ));
  };

  const renderQuestion = () => {
    const { question } = questions[currentQuestion];

    return (
      <div>
        <h3>{question}</h3>
        {renderOptions()}
      </div>
    );
  };

  const renderResult = () => {
    return (
      <div>
        <h3>Quiz Complete!</h3>
        <p>Your Score: {score}</p>
      </div>
    );
  };

  return (
    <div>
      {currentQuestion < questions.length ? renderQuestion() : renderResult()}
      <button onClick={handleNextQuestion}>Next</button>
    </div>
  );
};

export default Quiz;
