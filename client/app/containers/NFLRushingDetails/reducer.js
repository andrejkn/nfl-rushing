import {
  LOAD_PLAYERS_RUSHING_SUCCESS,
  LOAD_PLAYERS_RUSHING,
  LOAD_PLAYERS_RUSHING_ERROR,
  SORT_BY,
  FILTER_BY_PLAYER_NAME,
  CHANGE_PAGE,
} from './constants';

const toggleSort = (current) => {
  const sortStates = [null, 'Descending', 'Ascending'];
  return sortStates[(sortStates.indexOf(current) + 1) % sortStates.length];
}

const initialSortState = {
  total_rushing_yards: null,
  longest_rush: null,
  total_rushing_touchdowns: null,
};

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  playersRushing: null,
  sortBy: initialSortState,
  playerName: null,
  pageNumber: 0,
  totalPlayers: null,
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
        playersRushing: action.payload.items,
        totalPlayers: action.payload.total_items,
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
          ...initialSortState,
          [action.payload]: toggleSort(state.sortBy[action.payload]),
        },
      };
    }

    case FILTER_BY_PLAYER_NAME: {
      return {
        ...state,
        playerName: action.payload,
      };
    }

    case CHANGE_PAGE: {
      return {
        ...state,
        pageNumber: action.payload,
      };
    }

    default:
      return state;
  }
}

export default appReducer;
