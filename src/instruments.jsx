import { decode } from "html-entities";
import { nanoid } from "nanoid";

function shuffleArray(array) {
  const elements = array.slice();
  for (let i = elements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [elements[i], elements[j]] = [elements[j], elements[i]];
  }
  return elements;
}

async function getQuizData() {
  try {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple"
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    const results = data.results;
    const newArray = results.map((quizEl) => {
      const shuffledAnswers = shuffleArray([
        {
          answer: decode(quizEl.correct_answer),
          isCorrect: true,
          isSelected: false,
          id: nanoid(),
        },
        ...quizEl.incorrect_answers.map((element) => ({
          answer: decode(element),
          isCorrect: false,
          isSelected: false,
          id: nanoid(),
        })),
      ]);

      return {
        ...quizEl,
        question: decode(quizEl.question),
        answers: shuffledAnswers,
      };
    });
    return newArray;
  } catch (error) {
    console.error("An error occured:", error);
    throw error;
  }
}

export { shuffleArray, getQuizData };
