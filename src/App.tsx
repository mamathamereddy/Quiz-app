import React, { useState } from "react";
import { Difficulty, fetchQuizQuestions, QuestionState } from "./API";
import QuestionCard from "./components/QuestionCard";
import { GlobalStyle, Wrapper } from "./App.styles";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const Total_Questions = 10;

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(fetchQuizQuestions(Total_Questions, Difficulty.EASY));

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      Total_Questions,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;

      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === Total_Questions) {
      setGameOver(true);
    } else setNumber(nextQuestion);
  };

  return (
    <>
      <Wrapper>
        <GlobalStyle />
        <h1>QUIZZ APP</h1>
        {gameOver || userAnswers.length === Total_Questions ? (
          <button className="start" onClick={startQuiz}>
            start
          </button>
        ) : null}

        {!gameOver ? <p className="score">Score:{score}</p> : null}
        {loading && <p>Loading questions..</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQusetions={Total_Questions}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            handleClick={checkAnswer}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== Total_Questions - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
