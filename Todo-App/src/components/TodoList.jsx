import TodoItem from "./TodoItem";

export default function TodoList({ todos, deleteTodo, toggleTodo, editTodo }) {
  if (todos.length === 0) {
    return <p className="empty-message">No tasks available</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
}
