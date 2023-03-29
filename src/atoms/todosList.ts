import { atom } from "jotai";
import { Todo } from "../types/todo";

export interface State {
  todos: Todo[];
}

export const initialState = {
  todos: [
    {
      id: 1,
      title: "Buy groceries",
      state: false,
      description: "Avocado, potato, cucumbers, onion",
    },
    { id: 2, title: "Clean the house", state: true },
    { id: 3, title: "Go for a walk", state: false },
  ],
};

const todosAtom = atom<State>(initialState);

export default todosAtom;
