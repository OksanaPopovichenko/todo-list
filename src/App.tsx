import React from "react";
import TodoList from "./components/ToDoList/ToDoList";

function App(): JSX.Element {
  return (
    <div className="bg-blue-600 min-h-screen h-full w-full pt-16">
      <h1 className="text-center text-2xl font-bold text-white py-3">
        ToDo List
      </h1>
      <div className="bg-white rounded-md w-[550px] mx-auto min-h-[400px] max-h-[550px] p-4">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
