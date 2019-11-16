import {
  LOAD_PLAYERS_RUSHING_SUCCESS,
  LOAD_PLAYERS_RUSHING,
  LOAD_PLAYERS_RUSHING_ERROR,
} from './constants';

/**
 * Load the players rushing data
 *
 * @return {object} An action object with a type of LOAD_PLAYERS_RUSHING
 */
export function loadPlayersRushing() {
  return {
    type: LOAD_PLAYERS_RUSHING,
  };
}

/**
 * Dispatched when the players rushing data is loaded by the request saga
 *
 * @param  {array} playersRushing The repository data
 *
 * @return {object} An action object with a type of LOAD_PLAYERS_RUSHING_SUCCESS
 */
export function playersRushingLoaded(payload) {
  return {
    type: LOAD_PLAYERS_RUSHING_SUCCESS,
    payload,
  };
}

/**
 * Dispatched when loading the players rushing fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_PLAYERS_RUSHING passing the error
 */
export function playersRushingLoadingError(error) {
  return {
    type: LOAD_PLAYERS_RUSHING_ERROR,
    error,
  };
}
