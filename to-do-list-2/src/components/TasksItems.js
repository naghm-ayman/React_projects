import { useTasks } from "../context/tasksContext"
import TaskList from "./TaskList"

function TasksItems() {
    const {tasks} = useTasks()
    return (
        <ul>
            {tasks.map((task)=> <TaskList key={task.id} taskObj={task}/>)}
        </ul>
    )
}

export default TasksItems
