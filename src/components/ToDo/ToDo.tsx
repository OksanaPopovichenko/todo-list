import React, { useState } from "react";
import { Todo } from "../../types/todo";

interface ToDoProps {
  index: number;
  todo: Todo;
  handleTodoStateChange: (index: number, checked: boolean) => void;
  handleTitleClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
  handleTitleBlur: (
    e: React.FocusEvent<HTMLSpanElement>,
    index: number
  ) => void;
  handleDelete: () => void;
}

export default function ToDo({
  index,
  todo,
  handleTodoStateChange,
  handleTitleClick,
  handleTitleBlur,
  handleDelete,
}: ToDoProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer">
      <input
        type="checkbox"
        checked={todo.state}
        onChange={(event) => handleTodoStateChange(index, event.target.checked)}
        className="h-6 w-6 border rounded-md text-blue-500 cursor-pointer focus:outline-none"
      />
      <span
        aria-hidden="true"
        className={`${
          todo.state ? "line-through text-gray-400" : "text-gray-600"
        } flex-grow outline-none`}
        onClick={handleTitleClick}
        onBlur={(e) => handleTitleBlur(e, index)}
        contentEditable={isEditing ? "true" : "false"}
        onKeyDown={handleKeyDown}
      >
        {todo.title}
      </span>
      <button
        type="button"
        className="text-red-500 hover:text-red-700"
        onClick={handleDelete}
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
  );
}
