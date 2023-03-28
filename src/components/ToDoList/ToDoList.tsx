/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { useTodos } from "../../hooks/useTodoList";
import ToDo from "../ToDo/ToDo";
import { Todo } from "../../types/todo";

export default function TodoList(): JSX.Element {
  const { todos, updateTodo, deleteTodo } = useTodos();
  const [reorderedTodos, setReorderedTodos] = useState<Array<Todo>>([]);

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

  useEffect(() => {
    const newOrder = todos.sort((a, b) =>
      a.state === b.state ? 0 : a.state ? 1 : -1
    );

    setReorderedTodos(newOrder);
  }, [todos]);

  return (
    <div className="w-full pt-2">
      {todos.length === 0 && (
        <p className="text-center text-lg text-gray-400 relative">
          No todos to show
        </p>
      )}
      <ul className="divide-y divide-dashed">
        {reorderedTodos.map((todo, index) => {
          return (
            <li key={todo.id}>
              <ToDo
                index={index}
                todo={todo}
                handleTodoStateChange={handleTodoStateChange}
                handleTitleClick={handleTitleClick}
                handleTitleBlur={handleTitleBlur}
                handleDelete={() => deleteTodo(index)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
