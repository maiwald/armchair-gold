import { User, Post } from "./types";

const createAction = <T extends string, P>(type: T, payload: P) => ({ type, payload });

export enum ActionType {
  SET_USER = "SET_USER",
  ADD_POST = "ADD_POST",
}

export const actions = {
  setUser: (user: User) => createAction(ActionType.SET_USER, user),
  addPost: (post: Post) => createAction(ActionType.ADD_POST, post),
};

type ActionMap = typeof actions;

export type AppAction = ReturnType<ActionMap[keyof ActionMap]>;
