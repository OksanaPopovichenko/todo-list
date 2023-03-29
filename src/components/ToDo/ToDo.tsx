import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Todo } from "../../types/todo";
import { useTodos } from "../../hooks/useTodoList";

interface ToDoProps {
  id: number;
  todo: Todo;
}

export default function ToDo({ id, todo }: ToDoProps): JSX.Element {
  const [showDropdown, setShowDropdown] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { todos, updateTodo, deleteTodo } = useTodos();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  function handleTodoStateChange(ID: number, checked: boolean) {
    const item = todos.find((t) => t.id === ID);
    if (item) {
      const updatedTodo = { ...item, state: checked };
      updateTodo(item.id, updatedTodo);
    }
  }

  function handleTitleClick(e: React.MouseEvent<HTMLSpanElement>) {
    e.currentTarget.contentEditable = "true";
    e.currentTarget.focus();
  }

  function handleTitleBlur(e: React.FocusEvent<HTMLSpanElement>, ID: number) {
    e.currentTarget.contentEditable = "false";
    const el = todos.find((t) => t.id === ID);
    if (el) {
      const updatedTodo = { ...el, title: e.currentTarget.innerText };
      updateTodo(el.id, updatedTodo);
    }
  }

  return (
    <div className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer relative">
      <input
        type="checkbox"
        checked={todo.state}
        onChange={(event) => handleTodoStateChange(id, event.target.checked)}
        className="h-6 w-6 border rounded-md text-blue-500 cursor-pointer focus:outline-none"
      />
      <span
        aria-hidden="true"
        className={`${
          todo.state ? "line-through text-gray-400" : "text-gray-600"
        } flex-grow outline-none`}
        onClick={handleTitleClick}
        onBlur={(e) => handleTitleBlur(e, id)}
        contentEditable="true"
      >
        {todo.title}
      </span>
      <button type="button" onClick={() => setShowDropdown(!showDropdown)}>
        <FontAwesomeIcon icon={faEllipsis} className="text-gray-600" />
      </button>
      {showDropdown && (
        <div
          ref={menuRef}
          className="absolute z-10 right-0 top-10 bg-white border border-gray-200 rounded-md shadow-lg py-1"
        >
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => deleteTodo(id)}
            aria-hidden="true"
          >
            Delete
          </div>
          <Link to={`/${todo.id}`}>
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              More info
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
