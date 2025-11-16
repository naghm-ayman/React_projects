import { useQuiz } from "../context/ReactQuizContext";

function FinishScreen() {
  const {numPoints ,points, highscore, dispatch } = useQuiz()

  const percentage = (points / numPoints) * 100;
    return (
        <>
        <p className="result">
        You finished the Quiz with <strong>{points}</strong> out of{" "}
        <strong>{numPoints}</strong> with ({Math.ceil(percentage)})%
        </p>
        <p className="highscore">(HighScore: {highscore} points)</p>
        <button className="btn btn-ui" onClick={()=> dispatch({type: "reset"})}>Restart Quiz</button>
        </>
    );
}

export default FinishScreen;
