import { HiOutlineCheckCircle } from "react-icons/hi";
import { HiPencilAlt } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { useTasks } from "../context/tasksContext";
import toast from "react-hot-toast";

function TaskList({ taskObj }) {
  const { setShowEdit, setTaskId, setShowDelete, dispatch } = useTasks();

  function handleComplete(id) {
    dispatch({type: "completeTasks", payload: id})
    
    if(!taskObj.isCompleted){
      toast.success("Task successfully completed")
    }else {
    toast("Task marked incomplete");
  }
    
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
