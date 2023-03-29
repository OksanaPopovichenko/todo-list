import { useReducerAtom } from "jotai/utils";
import todosAtom, { State } from "../atoms/todo";
import { Todo } from "../types/todo";

interface FindTodoByIdAction {
  type: "FIND_TODO";
  payload: Todo;
}
type Action = FindTodoByIdAction;

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FIND_TODO":
      return {
        todos: [...state.todos, action.payload],
      };
    default:
      return state;
  }
};

export function useFindTodo() {
  const [state, dispatch] = useReducerAtom(todosAtom, reducer);

  function findTodo(todo: Todo) {
    dispatch({ type: "FIND_TODO", payload: todo });
  }

  return { todos: state.todos, findTodo };
}
