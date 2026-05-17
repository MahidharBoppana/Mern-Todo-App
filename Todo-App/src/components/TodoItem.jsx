import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function TodoItem({ todo, deleteTodo, toggleTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function handleSave() {
    if (!editText.trim()) return;

    editTodo(todo._id, editText);

    setIsEditing(false);
  }

  return (
    <li className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          value={todo.completed}
          onChange={() => toggleTodo(todo._id)}
        />

        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        ) : (
          <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
        )}

        <div className="buttons">
          {isEditing ? (
            <>
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>

              <button
                className="cancel-btn"
                onClick={() => {
                  setIsEditing(false);
                  setEditText(todo.text);
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="edit-btn"
                disabled={todo.completed}
                onClick={() => setIsEditing(true)}
              >
                <FaEdit />
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTodo(todo._id)}
              >
                <FaTrash />
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}
