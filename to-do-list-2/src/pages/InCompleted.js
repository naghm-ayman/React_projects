import TaskList from "../components/TaskList";
import { useTasks } from "../context/tasksContext";

function InCompleted() {
  const { tasks } = useTasks();
  const incompletedTasks = tasks.filter(task => !task.isCompleted);
  
  if (incompletedTasks.length === 0) {
    return <h1 className="text-lg font-bold text-center text-gray-800 mt-4">There is no incompleted Tasks Now</h1>;
  }
  
  return (
    <>
    <h1 className="text-lg font-bold text-center text-gray-800">The InCompleted Tasks</h1>
      {incompletedTasks.map(task => <TaskList key={task.id} taskObj={task} />)}
    </>
  );
}

export default InCompleted
