import { useEffect } from "react";
import { useQuiz } from "../context/ReactQuizContext";

function Timer() {
    const {dispatch, remainingTime} = useQuiz()
    const mins = Math.floor(remainingTime / 60);
    const secs = remainingTime % 60
        useEffect(function(){
            const id = setInterval(function(){
                dispatch({type: "tick"})
            },1000)
            return () => clearInterval(id);
        },[dispatch])
    return <div className="timer">
        {mins < 10 && "0"}
        {mins}:{secs < 10 && "0"}
        {secs}
        
    </div>;
}

export default Timer;
