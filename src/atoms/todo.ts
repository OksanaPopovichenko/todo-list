import { atom } from "jotai";
import { Todo } from "../types/todo";

export interface State {
  currentTodo: Todo | undefined;
}

export const initialState = {
  currentTodo: {
    id: 0,
    title: "",
    state: false,
    description: "",
  },
};

const todoAtom = atom<State>(initialState);

export default todoAtom;
