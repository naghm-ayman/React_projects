import { useQuiz } from "../context/ReactQuizContext";
import Options from "./Options";
function Questions() {
    const { questions, index} = useQuiz()
    const question = questions[index]
    if (!question) return null;

    return (
        <div>
        <h4>{question.question}</h4>
        <Options question={question}/>
        </div>
    );
}

export default Questions;
