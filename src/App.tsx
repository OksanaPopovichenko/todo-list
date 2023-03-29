import React, { useState } from "react";
import TodoList from "./components/ToDoList/ToDoList";
import { useTodos } from "./hooks/useTodoList";
import { Todo } from "./types/todo";

function App(): JSX.Element {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { todos, addTodo } = useTodos();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim() === "") {
      alert("Please enter a title for the todo");
      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todos.map((todo) => todo.id)) + 1,
      title: title.trim(),
      description: description.trim(),
      state: false,
    };

    addTodo(newTodo);

    // Reset the form
    setTitle("");
    setDescription("");
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  return (
    <div className="bg-blue-600 min-h-screen h-full w-full pt-4">
      <h1 className="text-center text-2xl font-bold text-white py-3">
        ToDo List
      </h1>
      <div className="bg-white rounded-md w-[550px] mx-auto min-h-[400px] max-h-[550px] p-4 flex flex-col gap-4">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Title"
              className="w-full border-gray-400 border rounded-md px-3 py-2"
              value={title}
              onChange={handleTitleChange}
            />
            <textarea
              rows={2}
              placeholder="Description"
              className="w-full border-gray-400 border rounded-md px-3 py-2"
              value={description}
              onChange={handleDescriptionChange}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-8 py-2"
            >
              Add
            </button>
          </div>
        </form>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
