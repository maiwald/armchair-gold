import type { AppState, Location, Character } from "./types";
import { type AppAction, ActionType } from "./actions";
import { generateEntityId } from "@/utils/entity";

export const initialState: AppState = {
  characters: {},
  locations: {},
  selectedLocationId: null,
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
        id: id,
        name: action.payload.name,
        width: 20,
        height: 20,
        position: { x: 0, y: 0 },
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

    case ActionType.UPDATE_LOCATION: {
      const { id, updates } = action.payload;
      const existingLocation = state.locations[id];
      
      if (!existingLocation) {
        return state;
      }

      return {
        ...state,
        locations: {
          ...state.locations,
          [id]: {
            ...existingLocation,
            ...updates,
          },
        },
      };
    }

    case ActionType.SELECT_LOCATION: {
      return {
        ...state,
        selectedLocationId: action.payload.id,
      };
    }

    default:
      return state;
  }
};

export default reducer;
