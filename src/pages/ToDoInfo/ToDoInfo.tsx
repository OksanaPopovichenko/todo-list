/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailedInfo from "../../components/DetailedInfo/DetailedInfo";
import { useFindTodo } from "../../hooks/useDetails";
import { useTodos } from "../../hooks/useTodoList";

function ToDoInfo(): JSX.Element {
  const { todos } = useTodos();
  const { currentTodo, findTodoById } = useFindTodo();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      findTodoById(Number(id), todos);
    }
  }, [id]);

  return (
    <div className="bg-blue-600 min-h-screen h-full w-full pt-16">
      <h1 className="text-center text-2xl font-bold text-white py-3">
        ToDo Info
      </h1>
      <div className="bg-white rounded-md w-[550px] mx-auto min-h-[400px] p-4">
        <DetailedInfo todo={currentTodo} />
      </div>
    </div>
  );
}

export default ToDoInfo;
