import { HiOutlineCheckCircle } from "react-icons/hi";
import { HiPencilAlt } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { useTasks } from "../context/tasksContext";

function TaskList({ taskObj }) {
  const { setShowEdit, setTasks, setTaskId, setShowDelete } = useTasks();

  function handleComplete(id) {
    setTasks((tasks) => {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task

    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    return updatedTasks; 
    });
  }

  function handleEdit(id) {
    setTaskId(id);
    setShowEdit(true);
  }
  function handleDelete(id) {
    setTaskId(id);
    setShowDelete(true);
  }

  return (
    <li className="m-3 flex items-center justify-between rounded-lg bg-gray-900 p-5 text-gray-200 shadow-md">
      <div className="text-left">
        <h3 className="my-1 text-lg font-bold">{taskObj.title}</h3>
        <p className="text-sm text-gray-400">{taskObj.describtion}</p>
      </div>
      <div className="flex items-center gap-2 text-xl">
        <HiOutlineCheckCircle
          onClick={() => handleComplete(taskObj.id)}
          className={`${
            taskObj.isCompleted ? "text-green-700" : ""
          } hover:scale-150 hover:cursor-pointer`}
        />
        <HiPencilAlt
          onClick={() => handleEdit(taskObj.id)}
          className="hover:scale-150 hover:cursor-pointer"
        />
        <MdDeleteOutline
          onClick={() => handleDelete(taskObj.id)}
          className="text-red-800 hover:scale-150 hover:cursor-pointer"
        />
      </div>
    </li>
  );
}

export default TaskList;
