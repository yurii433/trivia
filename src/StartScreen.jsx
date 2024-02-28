export default function StartScreen(props) {
  return (
    <div className="container">
      <div className="circle circle-first"></div>

      <h1>Trivia</h1>
      <h4>Test your knowledge in fun way with this exciting trivia game!</h4>
      <button className="start-btn" onClick={props.startGame}>
        Start Game
      </button>
      <div className="circle circle-second"></div>
    </div>
  );
}
