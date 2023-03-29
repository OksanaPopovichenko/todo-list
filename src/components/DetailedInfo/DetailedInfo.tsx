import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import { useTodos } from "../../hooks/useTodoList";
import { Todo } from "../../types/todo";

interface DetailedInfoProps {
  todo: Todo;
}

function DetailedInfo({ todo }: DetailedInfoProps): JSX.Element {
  const { title, description, id } = todo;
  const { todos, updateTodo } = useTodos();

  function handleTitleClick(
    e: React.MouseEvent<HTMLParagraphElement | HTMLHeadingElement>
  ) {
    e.currentTarget.contentEditable = "true";
    e.currentTarget.focus();
  }

  function handleTitleBlur(
    e: React.FocusEvent<HTMLParagraphElement>,
    index: number
  ) {
    e.currentTarget.contentEditable = "false";
    const updatedTodo = { ...todos[index], title: e.currentTarget.innerText };
    updateTodo(index, updatedTodo);
  }

  return (
    <div className="min-h-[inherit] flex flex-col justify-between">
      <PerfectScrollbar className="w-full max-h-[350px] overflow-y-auto">
        <div className="p-4">
          <p className="text-gray-400 text-sm mb-2">
            State:
            {todo.state ? (
              <span className="font-bold ml-2 text-green-600">Completed</span>
            ) : (
              <span className="font-bold ml-2 text-red-600">Incomplete</span>
            )}
          </p>
          <h2
            className="text-2xl font-bold mt-2 text-center py-2 border-y border-dashed text-blue-600 cursor-pointer focus-visible:outline-none"
            onClick={handleTitleClick}
            onBlur={(e) => handleTitleBlur(e, id)}
            aria-hidden="true"
          >
            {title}
          </h2>
          <p
            className="text-gray-600 mt-4 cursor-pointer focus-visible:outline-none"
            onClick={handleTitleClick}
            onBlur={(e) => handleTitleBlur(e, id)}
            aria-hidden="true"
          >
            {description}
          </p>
        </div>
      </PerfectScrollbar>
      <div className="flex flex-row justify-end">
        <Link to="/">
          <button
            type="button"
            className="bg-blue-600 px-3 py-2 rounded-md text-white"
          >
            All todos
          </button>
        </Link>
      </div>
    </div>
  );
}

export default DetailedInfo;
