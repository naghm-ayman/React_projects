import { useState } from "react";
import { useTasks } from "../context/tasksContext";

function EditPopUp() {
  const { setShowEdit, setTasks, taskId } = useTasks();
  const [newEdit, setNewEdit] = useState({
    title: "",
    describtion: "",
  })

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowEdit(false);
    }
  };

  function handleEdit(e) {
  e.preventDefault();
    setTasks((tasks) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, title: newEdit.title, describtion: newEdit.describtion }
        : task
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    return updatedTasks; 
  });

  setShowEdit(false)
}
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div className="flex flex-col rounded-lg bg-gray-100 p-4 shadow-lg ">
        <h3 className="my-4 text-xl font-bold text-gray-900">Edit the Task</h3>
        <form onSubmit={handleEdit} className="flex w-[400px] flex-col">
          <label for="title" className="mt-2 text-gray-800">
            Title:
          </label>
          <input
            type="text"
            placeholder="title"
            id="title"
            value={newEdit.title}
            onChange={(e)=>setNewEdit({...newEdit, title: e.target.value})}
            className="mb-2 border-b-2 border-pink-600 bg-transparent p-2 focus:outline-none "
          />

          <label for="desc" className="mt-2 text-gray-800">
            Describtion:
          </label>
          <input
            type="text"
            placeholder="desc"
            id="desc"
            value={newEdit.describtion}
            onChange={(e)=>setNewEdit({...newEdit, describtion: e.target.value})}
            className="mb-2 border-b-2 border-pink-600 bg-transparent p-2 focus:outline-none "
          />
          <div className="mt-4">
            <button type="submit" className=" px-3 py-2 font-medium text-pink-600 hover:text-pink-900 focus:outline-none">
              Save Edits
            </button>
            <button
              className=" px-3 py-2 font-medium text-pink-600 hover:text-pink-900 focus:outline-none"
              onClick={() => setShowEdit(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPopUp;
