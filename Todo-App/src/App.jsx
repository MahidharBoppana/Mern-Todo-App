import { useEffect, useState } from "react";
import "./App.css";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import FilteredButtons from "./components/FilterButtons";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const API = import.meta.env.VITE_API_URL;

  async function fetchTodos() {
    try {
      const response = await axios.get(`${API}/api/todos`);

      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add Todo
  async function addTodo(input) {
    try {
      const response = await axios.post(`${API}/api/todos`, {
        text: input,
      });

      setTodos([...todos, response.data]);
    } catch (error) {
      console.log(error);
    }
  }

  // Delete Todo
  async function deleteTodo(id) {
    try {
      await axios.delete(`${API}/api/todos/${id}`);

      const updatedTodos = todos.filter((todo) => todo._id !== id);

      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  }

  // Toggle Todo
  async function toggleTodo(id) {
    try {
      const todoToUpdate = todos.find((todo) => todo._id === id);

      const response = await axios.put(`${API}/api/todos/${id}`, {
        completed: !todoToUpdate.completed,
      });

      const updatedTodos = todos.map((todo) =>
        todo._id === id ? response.data : todo,
      );

      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  }

  // Edit Todo
  async function editTodo(id, updatedText) {
    try {
      const response = await axios.put(`${API}/api/todos/${id}`, {
        text: updatedText,
      });

      const updatedTodos = todos.map((todo) =>
        todo._id === id ? response.data : todo,
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  }

  document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTodo(input);
    }
  });

  // Filter Todos
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.text
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "completed") {
      return todo.completed && matchesSearch;
    }

    if (filter === "pending") {
      return !todo.completed && matchesSearch;
    }

    return matchesSearch;
  });

  const pendingTasks = todos.filter((todo) => !todo.completed).length;

  function clearCompleted() {
    const updatedTodos = todos.filter((todo) => !todo.completed);

    setTodos(updatedTodos);
  }

  return (
    <div className="app-bg">
      <div className="container">
        <div className="header">
          <div className="main-header">
            <div className="logo">
              <FaCheckCircle />
            </div>

            <h1>Todo App</h1>
          </div>

          <p>Stay oraganized. Get things done 🚀</p>
        </div>

        <TodoForm addTodo={addTodo} />

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <FilteredButtons filter={filter} setFilter={setFilter} />

        <TodoList
          todos={filteredTodos}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
          editTodo={editTodo}
        />

        <div className="footer">
          <div className="task-summary">
            <h3>{pendingTasks} tasks pending</h3>

            <p>Keep going 💪</p>
          </div>

          <button className="clear-btn" onClick={clearCompleted}>
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
