function Progress({index, numQuestions, answer, points, numPoints}) {
    return (
        <header className="progress">
            <progress max={numQuestions} value={index + Number(answer !== null)}></progress>
            <p>Questions <strong> {index}/ {numQuestions}</strong> </p>
            <p>Points <strong> {points}/ {numPoints}</strong></p>
        </header>
    )
}

export default Progress
