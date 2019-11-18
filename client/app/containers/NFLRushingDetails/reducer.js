import {
  LOAD_PLAYERS_RUSHING_SUCCESS,
  LOAD_PLAYERS_RUSHING,
  LOAD_PLAYERS_RUSHING_ERROR,
  SORT_BY,
  FILTER_BY_PLAYER_NAME,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  playersRushing: null,
  sortBy: {
    // Total Rushing Yards, Longest Rush and Total Rushing Touchdowns
    total_rushing_yards: false,
    longest_rush: false,
    total_rushing_touchdowns: false,
  },
  playerName: null,
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

    case SORT_BY: {
      return {
        ...state,
        sortBy: {
          ...state.sortBy,
          [action.payload]: !state.sortBy[action.payload],
        },
      };
    }

    case FILTER_BY_PLAYER_NAME: {
      return {
        ...state,
        playerName: action.payload,
      };
    }
    default:
      return state;
  }
}

export default appReducer;
