import { useTasks } from "../context/tasksContext";

function DeletePopUp() {
    const { setShowDelete, setTasks, taskId} = useTasks();

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
        setShowDelete(false);
        }
    };
    function handleDelete(){
        setTasks((tasks) => {
        const newTasks = tasks.filter(task => task.id !== taskId);
        localStorage.setItem("tasks", JSON.stringify(newTasks));
        return newTasks;
    });

    setShowDelete(false)
    }
    
    
    return (
        <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={handleOverlayClick}
        >
        <div className="flex flex-col rounded-lg bg-gray-100 p-4 shadow-lg ">
            <h3 className="my-4 text-xl font-bold text-red-800">If you Deleted this task you won`t be able to restore it again</h3>
            
            <div className="mt-4">
                <button onClick={handleDelete} className=" px-3 py-2 font-medium text-red-800 hover: text-red-900 focus:outline-none">
                Delete
                </button>
                <button
                className=" px-3 py-2 font-medium text-red-800 hover: text-red-900 focus:outline-none"
                onClick={() => setShowDelete(false)}
                >
                Cancel
                </button>
            </div>
        </div>
        </div>
    );
}

export default DeletePopUp;
