const createAction = <T extends string, P>(type: T, payload: P) => ({
  type,
  payload,
});

export enum ActionType {
  CREATE_CHARACTER = "CREATE_CHARACTER",
  CREATE_LOCATION = "CREATE_LOCATION",
}

export const actions = {
  createCharacter: (name: string) =>
    createAction(ActionType.CREATE_CHARACTER, { name }),
  createLocation: (name: string) =>
    createAction(ActionType.CREATE_LOCATION, { name }),
};

type ActionMap = typeof actions;

export type AppAction = ReturnType<ActionMap[keyof ActionMap]>;
