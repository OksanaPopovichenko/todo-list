import React from "react";
import { useTodos } from "../../hooks/useTodoList";

export default function TodoList(): JSX.Element {
  const { todos, updateTodo, deleteTodo } = useTodos();

  const toggleTodoState = (id: number) => {
    const updatedTodo = todos.find((todo) => todo.id === id);
    if (updatedTodo) {
      updateTodo(todos.indexOf(updatedTodo), {
        ...updatedTodo,
        state: !updatedTodo.state,
      });
    }
  };

  return (
    <div className="w-1/3">
      {todos.length === 0 && <p>No todos to show</p>}
      <ul className="mt-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center border-b py-2"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.state}
                onChange={() => toggleTodoState(todo.id)}
                className="mr-2"
              />
              <span className={todo.state ? "line-through" : ""}>
                {todo.title}
              </span>
            </div>
            <div>
              <button
                type="button"
                onClick={() => deleteTodo(todos.indexOf(todo))}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
