function Options({ question, dispatch, answer }) {
    const choosenAnswer = answer !== null;
    return (
        <div className="options">
        {question.options.map((option, index) => (
            <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${choosenAnswer? index === question.correctOption ? "correct" : "wrong" : ""}`}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            disabled={choosenAnswer}
            key={option}
            >
            {option}
            </button>
        ))}
        </div>
    );
}

export default Options;
