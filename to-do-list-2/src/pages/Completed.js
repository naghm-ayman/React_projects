import TaskList from "../components/TaskList";
import { useTasks } from "../context/tasksContext"

function Completed() {
  const { tasks } = useTasks();
  const completedTasks = tasks.filter(task => task.isCompleted);
  
  if (completedTasks.length === 0) {
    return <h1  className="text-lg font-bold text-center text-gray-800 mt-4">There is no Completed Tasks Yet!</h1>;
  }
  
  return (
    <>
    <h1 className="text-lg font-bold text-center text-gray-800">The Completed Tasks</h1>
      {completedTasks.map(task => <TaskList key={task.id} taskObj={task} />)}
    </>
  );
}

export default Completed
