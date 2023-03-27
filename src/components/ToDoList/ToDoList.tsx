import React from "react";
import { useTodos } from "../../hooks/useTodoList";

export default function TodoList(): JSX.Element {
  const { todos } = useTodos();

  return (
    <div className="w-full pt-2">
      {todos.length === 0 && (
        <p className="text-center text-lg text-gray-400 relative">
          No todos to show
        </p>
      )}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={todo.state}
                className="h-6 w-6 border rounded-md text-blue-500 cursor-pointer focus:outline-none"
              />
              <span
                className={`${
                  todo.state ? "line-through text-gray-400" : "text-gray-600"
                } flex-grow`}
              >
                {todo.title}
              </span>
              <button type="button" className="text-red-500 hover:text-red-700">
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
