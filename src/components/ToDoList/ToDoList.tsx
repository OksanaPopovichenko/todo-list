import React from "react";
import { useTodos } from "../../hooks/useTodoList";

export default function TodoList(): JSX.Element {
  const { todos, updateTodo, deleteTodo } = useTodos();

  function handleTodoStateChange(index: number, checked: boolean) {
    const todo = todos[index];
    const updatedTodo = { ...todo, state: checked };
    updateTodo(index, updatedTodo);
  }

  function handleTitleClick(e: React.MouseEvent<HTMLSpanElement>) {
    e.currentTarget.contentEditable = "true";
    e.currentTarget.focus();
  }

  function handleTitleBlur(
    e: React.FocusEvent<HTMLSpanElement>,
    index: number
  ) {
    e.currentTarget.contentEditable = "false";
    const updatedTodo = { ...todos[index], title: e.currentTarget.innerText };
    updateTodo(index, updatedTodo);
  }

  return (
    <div className="w-full pt-2">
      {todos.length === 0 && (
        <p className="text-center text-lg text-gray-400 relative">
          No todos to show
        </p>
      )}
      <ul className="divide-y divide-dashed">
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <div className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={todo.state}
                onChange={(event) =>
                  handleTodoStateChange(index, event.target.checked)
                }
                className="h-6 w-6 border rounded-md text-blue-500 cursor-pointer focus:outline-none"
              />
              <span
                aria-hidden="true"
                className={`${
                  todo.state ? "line-through text-gray-400" : "text-gray-600"
                } flex-grow outline-none`}
                onClick={(e) => handleTitleClick(e)}
                onBlur={(e) => handleTitleBlur(e, index)}
              >
                {todo.title}
              </span>
              <button
                type="button"
                className="text-red-500 hover:text-red-700"
                onClick={() => deleteTodo(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
