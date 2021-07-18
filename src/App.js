import "./App.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Login from "./Login";

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [todoList, setTodoList] = useState([]);

  const addItem = () => {
    if (todoInput) {
      const todoObject = { id: uuidv4(), value: todoInput };
      setTodoList([...todoList, todoObject]);
      setTodoInput("");
    }
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  const markAsDone = (itemToMarkAsDone) => {
    const index = todoList.findIndex((item) => item.id === itemToMarkAsDone.id);
    todoList[index].done = true;
    setTodoList([...todoList]);
  };

  const deleteTodo = (itemToDelete) => {
    const index = todoList.findIndex((item) => item.id === itemToDelete.id);
    todoList.splice(index, 1);
    setTodoList([...todoList]);
  };

  return (
    <div className="App">
      <h1>TODO app</h1>
      <Login />
      <input
        type="text"
        placeholder="add to do item"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
        onKeyPress={onKeyPress}
      ></input>
      <button onClick={addItem}>Add</button>
      <ul>
        {todoList.map((item) => (
          <li key={item.id}>
            <input type="checkbox" onClick={() => markAsDone(item)} />
            <span className={item.done ? "done" : ""}>{item.value}</span>
            <input
              type="button"
              onClick={() => deleteTodo(item)}
              value="delete"
            />
          </li>
        ))}
      </ul>{" "}
    </div>
  );
}

export default App;
