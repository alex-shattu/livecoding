import persistor from '../../utils/persistor';

export enum ActionTypes {
  Init,
  Add,
  Edit,
  Delete,
}

export type Item = { value: string; id: number };
export type State = Item[];
export type Action =
  | {
      type: ActionTypes.Init;
      payload: Item[];
    }
  | {
      type: ActionTypes.Add | ActionTypes.Edit;
      payload: Item;
    }
  | {
      type: ActionTypes.Delete;
      payload: number;
    };

export const storageKey = 'livecoding_cache';

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.Init:
      return action.payload;
    case ActionTypes.Add: {
      const newState = [...state, action.payload];
      persistor.save(newState, storageKey);
      return newState;
    }
    case ActionTypes.Edit: {
      const index = state.findIndex(item => item.id === action.payload.id);
      state[index] = action.payload;
      persistor.save(state, storageKey);
      return state;
    }
    case ActionTypes.Delete: {
      // const index = state.findIndex(item => item.id === action.payload);
      const newState = state.filter(item => item.id !== action.payload);
      persistor.save(newState, storageKey);
      return newState;
    }
    default:
      throw new Error();
  }
};

export const select = (items: Item[], id: number) =>
  items.find(item => item.id === id) || { value: '', id: null };
