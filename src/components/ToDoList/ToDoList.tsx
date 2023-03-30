/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useTodos } from "../../hooks/useTodoList";
import ToDo from "../ToDo/ToDo";
import { Todo } from "../../types/todo";

export default function TodoList(): JSX.Element {
  const { todos } = useTodos();
  const [reorderedTodos, setReorderedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const newOrder = todos.sort((a, b) =>
      a.state === b.state ? 0 : a.state ? 1 : -1
    );

    setReorderedTodos(newOrder);
  }, [todos]);

  const variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
  };

  return (
    <PerfectScrollbar className="w-full max-h-[350px] min-h-[285px] overflow-y-auto">
      {todos.length === 0 && (
        <p className="text-center text-lg text-gray-400 relative">
          No todos to show
        </p>
      )}
      <ul className="divide-y divide-dashed">
        <AnimatePresence>
          {reorderedTodos.map((todo) => (
            <motion.li key={todo.id} variants={variants} layout>
              <ToDo id={todo.id} todo={todo} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </PerfectScrollbar>
  );
}
