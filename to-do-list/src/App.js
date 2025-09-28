import { useState } from "react";

const tasks = [
  { id: 1, text: "Learn React basics", completed: false },
  { id: 2, text: "Practice with small project", completed: false },
  { id: 3, text: "Review props and state", completed: true },
];

export default function App() {
  const [task, setTask] = useState("");
  const [importance, setImportance] = useState("normal");
  const [addTask, setAddTask] = useState(tasks);

  function handleAddTask(newtask) {
    setAddTask((addTask) => [...addTask, newtask]);
  }
  function handleDelete(id) {
    setAddTask((tasks) => tasks.filter((curtask) => curtask.id !== id));
  }
  function handleEdit(id) {
    const newText = prompt("Enter the new Task!");
    if (!newText) return;

    setAddTask((tasks) =>
      tasks.map((curtask) =>
        curtask.id === id ? { ...curtask, text: newText } : curtask
      )
    );
  }
  function handleReset() {
    setAddTask([]);
    setTask("");
    setImportance("normal");
  }
  function handleCheckBox(id) {
    setAddTask((tasks) =>
      tasks.map((curtask) =>
        curtask.id === id
          ? { ...curtask, completed: !curtask.completed }
          : curtask
      )
    );
  }
  return (
    <div className="app">
      <header>
        <h1>To do List</h1>
      </header>
      <TaskInput
        task={task}
        setTask={setTask}
        importance={importance}
        setImportance={setImportance}
        onAddTask={handleAddTask}
      />
      <TasksList
        addTask={addTask}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onCheckBox={handleCheckBox}
      />
      {addTask.length > 0 && <Button onClick={handleReset}>reset all</Button>}
      <Footer addTask={addTask}/>
    </div>
  );
}
function Button({ children, onClick }) {
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
}
function TaskInput({ task, setTask, importance, setImportance, onAddTask }) {
  function handleSubmit(e) {
    e.preventDefault();

    if (!task) return;

    const id = crypto.randomUUID();
    const newTask = { id, text: task, completed: false, importance };

    onAddTask(newTask);
    setTask("");
    setImportance("normal");
  }
  return (
    <form className="taskinput" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your task here..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <span>
        <label>Enter task Importance level:</label>
        <select
          value={importance}
          onChange={(e) => setImportance(e.target.value)}
        >
          <option value="crucial">Crucial task ❗❗</option>
          <option value="important">Important task 💥</option>
          <option value="normal">Normal task 😌</option>
          <option value="not-important">Not Important task 😴</option>
        </select>
      </span>
      <Button>add task</Button>
    </form>
  );
}
function TasksList({ addTask, onDelete, onEdit, onCheckBox }) {
  const taskArray = addTask;
  return (
    <div>
      {taskArray.map((task) => (
        <TasksItems
          taskObj={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onCheckBox={onCheckBox}
          key={task.id}
        />
      ))}
    </div>
  );
}
function TasksItems({ taskObj, onDelete, onEdit, onCheckBox }) {
  return (
    <ul>
      <li className={taskObj.importance}>
        <span
          style={taskObj.completed ? { textDecoration: "line-through" } : {}}
        >
          <input
            type="checkbox"
            value={taskObj.completed}
            onChange={() => onCheckBox(taskObj.id)}
          />
          {taskObj.text}
        </span>
        <span>
          <button className="task-btn" onClick={() => onDelete(taskObj.id)}>
            Delete
          </button>
          <button className="task-btn" onClick={() => onEdit(taskObj.id)}>
            Edit
          </button>
        </span>
      </li>
    </ul>
  );
}
function Footer({addTask}) {
  const taskNum = addTask.length;
  if(!taskNum) return <footer>Lets start Acheiving🚀</footer>
  const done = addTask.filter((task)=> task.completed).length
  const unDone = taskNum - done;

  return (
    <footer>
      <span>{done} task completed | {unDone} task Uncompleted</span>
    </footer>
  );
}
