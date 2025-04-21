import type { FC, ReactNode, Dispatch } from "react";
import { createContext, useContext, useReducer } from "react";

import reducer, { initialState } from "./reducer";
import type { AppState } from "./types";
import { AppAction } from "./actions";

interface StoreContextType {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}

const StoreContext = createContext<StoreContextType>({
  state: initialState,
  dispatch: () => null,
});

export const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

type Selector<T> = (state: AppState) => T;

export function useStore<T>(selector: Selector<T>): [T, Dispatch<AppAction>] {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }

  const { state, dispatch } = context;
  return [selector(state), dispatch];
}
