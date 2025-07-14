const createAction = <T extends string, P>(type: T, payload: P) => ({
  type,
  payload,
});

export enum ActionType {
  CREATE_CHARACTER = "CREATE_CHARACTER",
  CREATE_LOCATION = "CREATE_LOCATION",
  UPDATE_LOCATION = "UPDATE_LOCATION",
  SELECT_LOCATION = "SELECT_LOCATION",
}

export const actions = {
  createCharacter: (name: string) =>
    createAction(ActionType.CREATE_CHARACTER, { name }),
  createLocation: (name: string) =>
    createAction(ActionType.CREATE_LOCATION, { name }),
  updateLocation: (id: string, updates: Partial<Omit<import("./types").Location, "id">>) =>
    createAction(ActionType.UPDATE_LOCATION, { id, updates }),
  selectLocation: (id: string | null) =>
    createAction(ActionType.SELECT_LOCATION, { id }),
};

type ActionMap = typeof actions;

export type AppAction = ReturnType<ActionMap[keyof ActionMap]>;
