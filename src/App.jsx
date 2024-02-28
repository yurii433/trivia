import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { getQuizData } from "./instruments";
import StartScreen from "./StartScreen";
import Question from "./Question";
import "./App.css";

function App() {
  const [quizData, setQuizData] = useState([]);
  const [quizStart, setQuizStart] = useState(false);
  const [answerCheck, setAnswersCheck] = useState(false);
  const [selectNotification, setSelectNotification] = useState(false);
  const [score, setScore] = useState(0);

  async function startGame() {
    const result = await getQuizData();
    setQuizData(result);
    setQuizStart(true);
    setAnswersCheck(false);
    setSelectNotification(false);
  }

  function selectAnswer(id) {
    try {
      if (Array.isArray(quizData)) {
      }
      setQuizData((prevQuizData) => {
        return prevQuizData.map((question) => {
          return {
            ...question,
            answers: question.answers.map((answer) => {
              if (answer.id === id) {
                return { ...answer, isSelected: !answer.isSelected };
              } else if (question.answers.some((a) => a.id === id)) {
                return { ...answer, isSelected: false };
              } else {
                return answer;
              }
            }),
          };
        });
      });
    } catch (error) {
      console.error("An error occured while updating state:", error);
    }
  }

  function checkAnswers() {
    try {
      let answersSelected = 0;
      let newScore = 0;

      for (const answer of quizData) {
        const isSelected = answer.answers.some((answer) => answer.isSelected);
        const isCorrect = answer.answers.some(
          (answer) => answer.isSelected && answer.isCorrect
        );

        if (isCorrect) {
          newScore++;
        }
        if (isSelected) {
          answersSelected++;
        }
      }

      setScore(newScore);

      if (answersSelected < 5) {
        setSelectNotification(true);
      } else {
        setAnswersCheck(true);
      }
    } catch (error) {
      console.error("An error occured", error);
    }
  }

  function GameScreen() {
    const Questions = quizData.map((question) => {
      return (
        <Question
          question={question.question}
          answers={question.answers}
          selectAnswer={selectAnswer}
          key={nanoid()}
          answerCheck={answerCheck}
        />
      );
    });
    return (
      <>
        <div className="container">
          <div className="circle-sm circle-first"></div>

          <div className="questions-wrap">{Questions}</div>
          {selectNotification && (
            <p className="notification">
              Please select answers to all questions
            </p>
          )}
          {answerCheck ? (
            <div className="score-wrap">
              <h3>You answerd {score}/5 correct answers </h3>
              <button className="start-btn new-game-btn" onClick={startGame}>
                Play Again
              </button>
            </div>
          ) : (
            <button className="start-btn game-btn" onClick={checkAnswers}>
              Check answers
            </button>
          )}

          <div className="circle-sm circle-second"></div>
        </div>
      </>
    );
  }

  return (
    <>{quizStart ? <GameScreen /> : <StartScreen startGame={startGame} />}</>
  );
}

export default App;
