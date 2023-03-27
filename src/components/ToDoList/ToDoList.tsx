/* eslint-disable react/jsx-no-bind */
import React from "react";
import { useTodos } from "../../hooks/useTodoList";
import ToDo from "../ToDo/ToDo";

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
          <ToDo
            key={todo.id}
            index={index}
            todo={todo}
            handleTodoStateChange={handleTodoStateChange}
            handleTitleClick={handleTitleClick}
            handleTitleBlur={handleTitleBlur}
            handleDelete={() => deleteTodo(index)}
          />
        ))}
      </ul>
    </div>
  );
}
