/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-case-declarations */
import { useReducerAtom } from "jotai/utils";
import todoAtom, { State } from "../atoms/todo";
import { Todo } from "../types/todo";

interface FindTodoByIdAction {
  type: "FIND_TODO";
  payload: {
    id: number;
    todos: Todo[];
  };
}

type Action = FindTodoByIdAction;

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FIND_TODO":
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const todo: any = action.payload.todos.find(
        (item: { id: number }) => item.id === action.payload.id
      );
      return { ...state, currentTodo: todo };
    default:
      return state;
  }
};

export function useFindTodo() {
  const [state, dispatch] = useReducerAtom(todoAtom, reducer);

  function findTodoById(id: number, todos: Todo[]) {
    dispatch({ type: "FIND_TODO", payload: { id, todos } });
  }

  return { currentTodo: state.currentTodo, findTodoById };
}
