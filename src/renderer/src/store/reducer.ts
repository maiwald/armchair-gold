import type { AppState } from "./types";
import { type AppAction, ActionType } from "./actions";

export const initialState: AppState = {
  user: null,
  posts: [],
} as const;

const reducer = (state: AppState = initialState, action: AppAction): AppState => {
  switch (action.type) {
    case ActionType.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ActionType.ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
