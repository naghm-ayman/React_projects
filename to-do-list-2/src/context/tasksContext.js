import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const TasksContext = createContext();
const intialState = [
  {
    id: 1,
    title: "task-1",
    describtion: "this is task 1",
    isCompleted: false,
  },
  {
    id: 2,
    title: "task-2",
    describtion: "this is task 2",
    isCompleted: false,
  },
  {
    id: 3,
    title: "task-3",
    describtion: "this is task 3",
    isCompleted: false,
  },
];
function reducer(state, action) {
  switch (action.type) {
    case "addNewTask": {
      const newArrTask = {
        id: crypto.randomUUID(),
        title: action.payload,
        describtion: "",
        isCompleted: false,
      };
      localStorage.setItem("tasks", JSON.stringify([...state, newArrTask]));

      return [...state, newArrTask];
    }
    case "deleteTasks": {
      const newTasks = state.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(newTasks));

      return newTasks;
    }
    case "editTask": {
      const updatedTasks = state.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              title: action.payload.title,
              describtion: action.payload.describtion,
            }
          : task
      );

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return updatedTasks;
    }
    case "completeTasks":{
        const updatedTasks = state.map((task) =>
        task.id === action.payload ? { ...task, isCompleted: !task.isCompleted } : task
    );
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        return updatedTasks
    }
    case "loadTasks": {
      try {
        const stored = JSON.parse(localStorage.getItem("tasks"));
        return Array.isArray(stored) ? stored : [];
      } catch {
        return [];
      }
    }
    default:
      throw new Error("Unknown Action");
  }
}
export function TaskProvider({ children }) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [state, dispatch] = useReducer(reducer, intialState);

  useEffect(() => {
    dispatch({ type: "loadTasks" });
  }, []);

  return (
    <TasksContext.Provider
      value={{
        showEdit,
        setShowEdit,
        showDelete,
        setShowDelete,
        taskId,
        setTaskId,
        tasks: state,
        dispatch,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined)
    throw new Error(
      "Undefined TasksContext — wrap components in <TasksContext>"
    );
  return context;
}

export { TasksContext, useTasks };
