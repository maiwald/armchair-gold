import type { AppState, Location, Character } from "./types";
import { type AppAction, ActionType } from "./actions";
import { generateEntityId } from "@/utils/entity";

export const initialState: AppState = {
  characters: {},
  locations: {},
} as const;

const reducer = (
  state: AppState = initialState,
  action: AppAction,
): AppState => {
  switch (action.type) {
    case ActionType.CREATE_CHARACTER: {
      let id = generateEntityId("C");
      while (Object.hasOwnProperty.call(state.characters, id)) {
        id = generateEntityId("C");
      }

      const newCharacter: Character = {
        id: id,
        name: action.payload.name,
      };

      return {
        ...state,
        characters: {
          ...state.characters,
          [newCharacter.id]: newCharacter,
        },
      };
    }

    case ActionType.CREATE_LOCATION: {
      let id = generateEntityId("L");
      while (Object.hasOwnProperty.call(state.locations, id)) {
        id = generateEntityId("L");
      }

      const newLocation: Location = {
        id: generateEntityId("L"),
        name: action.payload.name,
        width: 20,
        height: 20,
        foreground: [],
        background: [],
        collision: new Map(),
      };

      return {
        ...state,
        locations: {
          ...state.locations,
          [newLocation.id]: newLocation,
        },
      };
    }

    default:
      return state;
  }
};

export default reducer;
