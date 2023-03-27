import React from "react";
import TodoList from "./components/ToDoList/ToDoList";

function App(): JSX.Element {
  return (
    <div className="bg-blue-600 min-h-screen h-full w-full pt-16">
      <h1 className="text-center text-2xl font-bold text-white py-3">
        ToDo List
      </h1>
      <div className="bg-white w-[550px] min-h-[550px] mx-auto rounded-md">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
