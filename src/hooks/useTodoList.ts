import { useReducerAtom } from "jotai/utils";
import todosAtom, { State } from "../atoms/todosList";
import { Todo } from "../types/todo";

interface AddTodoAction {
  type: "ADD_TODO";
  payload: Todo;
}

interface UpdateTodoAction {
  type: "UPDATE_TODO";
  payload: {
    id: number;
    todo: Todo;
  };
}

interface DeleteTodoAction {
  type: "DELETE_TODO";
  payload: number;
}

type Action = AddTodoAction | UpdateTodoAction | DeleteTodoAction;

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        todos: [action.payload, ...state.todos],
      };
    case "UPDATE_TODO": {
      const { id, todo } = action.payload;
      const newTodos = [...state.todos];
      const todoIndex = newTodos.findIndex((t) => t.id === id);
      if (todoIndex !== -1) {
        newTodos[todoIndex] = { ...newTodos[todoIndex], ...todo };
      }
      return {
        todos: newTodos,
      };
    }
    case "DELETE_TODO":
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

export function useTodos() {
  const [state, dispatch] = useReducerAtom(todosAtom, reducer);

  function addTodo(todo: Todo) {
    dispatch({ type: "ADD_TODO", payload: todo });
  }

  function updateTodo(id: number, todo: Todo) {
    dispatch({ type: "UPDATE_TODO", payload: { id, todo } });
  }

  function deleteTodo(id: number) {
    dispatch({ type: "DELETE_TODO", payload: id });
  }

  return { todos: state.todos, addTodo, updateTodo, deleteTodo };
}
