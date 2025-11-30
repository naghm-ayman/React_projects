import { createContext, useContext, useState } from "react";

const TasksContext = createContext();


export function TaskProvider({ children }) {
    const initialTasks = [
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
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [tasks, setTasks] = useState(initialTasks || [])
    const [taskId, setTaskId] = useState(null)

    

    return (
        <TasksContext.Provider value={{showEdit, setShowEdit, showDelete, setShowDelete, tasks, setTasks, taskId, setTaskId }}>
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
