import React from "react";
import DetailedInfo from "../../components/DetailedInfo/DetailedInfo";

function ToDoInfo(): JSX.Element {
  return (
    <div className="bg-blue-600 min-h-screen h-full w-full pt-16">
      <h1 className="text-center text-2xl font-bold text-white py-3">
        ToDo Info
      </h1>
      <div className="bg-white rounded-md w-[550px] mx-auto min-h-[400px] p-4">
        <DetailedInfo
          todo={{
            id: 1,
            title: "Buy groceries",
            state: false,
            description: "Avocado, potato, cucumbers, onion",
          }}
        />
      </div>
    </div>
  );
}

export default ToDoInfo;
