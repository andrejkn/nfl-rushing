import {
  LOAD_PLAYERS_RUSHING_SUCCESS,
  LOAD_PLAYERS_RUSHING,
  LOAD_PLAYERS_RUSHING_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  playersRushing: null,
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PLAYERS_RUSHING: {
      const newState = {
        ...state,
        loading: true,
        error: false,
        playersRushing: [],
      };

      return newState;
    }
    case LOAD_PLAYERS_RUSHING_SUCCESS: {
      const newState = {
        ...state,
        loading: false,
        playersRushing: action.payload,
      };
      return newState;
    }

    case LOAD_PLAYERS_RUSHING_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    default:
      return state;
  }
}

export default appReducer;
