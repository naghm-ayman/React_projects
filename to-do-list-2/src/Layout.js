import { Link } from "react-router-dom";
import EditPopUp from "./components/EditPopUp";
import { useTasks } from "./context/tasksContext";
import { useEffect, useState } from "react";
import DeletePopUp from "./components/DeletePopUp";
function Layout({ children }) {
  const { showEdit, setTasks, tasks , showDelete } = useTasks();
  const [newTask, setNewTask] = useState("");

  
  function handleAdd(e) {
    e.preventDefault();
    
    if (newTask.trim() === "") return;

    const newArrTask = {
          id: crypto.randomUUID(),
          title: newTask,
          describtion: "",
          isCompleted: false,
        };

    setTasks((tasks) => [...tasks, newArrTask]);
    localStorage.setItem("tasks", JSON.stringify([...tasks, newArrTask]))
    setNewTask("");
  }

  useEffect(() => {
  try {
    const stored = JSON.parse(localStorage.getItem("tasks"));
    setTasks(Array.isArray(stored) ? stored : []);
  } catch {
    setTasks([]);
  }
}, []);


  return (
    <>
      <div className="relative w-[500px] rounded-lg bg-gray-100 p-6 shadow-lg">
        <h1 className="mb-2 text-center text-4xl font-bold text-gray-800">
          My Tasks
        </h1>

        <div className="my-5 flex justify-center gap-1">
          <Link
            to="/"
            className="rounded-lg border-2 border-gray-300 bg-white px-2 py-1 text-gray-700 transition-colors duration-200 hover:border-gray-400 hover:bg-gray-50"
          >
            All
          </Link>
          <Link
            to="/completed"
            className="rounded-lg border-2 border-gray-300 bg-white px-2 py-1 text-gray-700 transition-colors duration-200 hover:border-gray-400 hover:bg-gray-50"
          >
            Done
          </Link>
          <Link
            to="/incompleted"
            className="rounded-lg border-2 border-gray-300 bg-white px-2 py-1 text-gray-700 transition-colors duration-200 hover:border-gray-400 hover:bg-gray-50"
          >
            Not Yet
          </Link>
        </div>

        <div className="my-6 max-h-[400px] rounded-lg bg-white p-4 text-center shadow-sm overflow-auto">
          {children}
        </div>

        <form onSubmit={handleAdd} className="mt-6 flex gap-1">
          <input
            type="text"
            placeholder="Add your next task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 rounded-lg border-2 border-gray-300 bg-white p-2 transition-colors focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
          <button
            type="submit"
            className="w-1/4 rounded-lg bg-pink-600 p-2 font-medium text-white transition-colors hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            Add
          </button>
        </form>
      </div>
      {showEdit && <EditPopUp />}
      {showDelete && <DeletePopUp/>}
    </>
  );
}

export default Layout;
