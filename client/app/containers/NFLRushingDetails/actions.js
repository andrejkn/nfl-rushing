import {
  LOAD_PLAYERS_RUSHING_SUCCESS,
  LOAD_PLAYERS_RUSHING,
  LOAD_PLAYERS_RUSHING_ERROR,
  SORT_BY,
} from './constants';

export function loadPlayersRushing() {
  return {
    type: LOAD_PLAYERS_RUSHING,
  };
}

export function playersRushingLoaded(payload) {
  return {
    type: LOAD_PLAYERS_RUSHING_SUCCESS,
    payload,
  };
}

export function playersRushingLoadingError(error) {
  return {
    type: LOAD_PLAYERS_RUSHING_ERROR,
    error,
  };
}

export function sortBy(payload) {
  return {
    type: SORT_BY,
    payload,
  };
}
