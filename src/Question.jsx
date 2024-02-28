import PropTypes from "prop-types";

function defineStyles(answer, answerCheck) {
  if (answerCheck && answer.isSelected && answer.isCorrect) {
    return {
      backgroundColor: "#94D7A2",
      fontWeight: "bold",
      border: "none",
    };
  } else if (answerCheck && answer.isSelected && !answer.isCorrect) {
    return {
      backgroundColor: "#F8BCBC",
      border: "none",
    };
  } else if (answerCheck && !answer.isSelected && answer.isCorrect) {
    return {
      backgroundColor: "#94D7A2",
      border: "none",
      fontWeight: "bold",
    };
  } else if (answer.isSelected) return { backgroundColor: "#D6DBF5" };
}

export default function Question(props) {
  const Answers = props.answers.map((answer) => {
    const styles = defineStyles(answer, props.answerCheck);
    return (
      <p
        className="answer"
        style={styles}
        onClick={
          !props.answerCheck ? () => props.selectAnswer(answer.id) : null
        }
      >
        {answer.answer}
      </p>
    );
  });
  return (
    <>
      <h3 className="question">{props.question}</h3>
      <div className="answers-wrap"> {Answers}</div>
      <hr className="question-brake" />
    </>
  );
}

Question.propTypes = {
  answers: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  selectAnswer: PropTypes.func.isRequired,
  answerCheck: PropTypes.bool.isRequired,
};
