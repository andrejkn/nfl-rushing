import {
  call,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects';
import request from 'utils/request';

import {
  LOAD_PLAYERS_RUSHING,
  SORT_BY,
  FILTER_BY_PLAYER_NAME,
  ITEMS_PER_PAGE,
  CHANGE_PAGE,
} from './constants';

import {
  playersRushingLoaded,
  playersRushingLoadingError,
} from './actions';

import {
  makeSelectSortBy,
  makeSelectPlayerName,
  makeSelectPageNumber,
} from './selectors';

import { formatQueryParams } from './utils';

export function* getPlayersRushing() {
  const sortByState = yield select(makeSelectSortBy());
  const playerName = yield select(makeSelectPlayerName());
  const pageNumber = yield select(makeSelectPageNumber());

  const parametersString = formatQueryParams(sortByState, playerName, pageNumber, ITEMS_PER_PAGE);
  const requestURL = `http://localhost:8000/players_rushing${parametersString}`;

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL);
    yield put(playersRushingLoaded(data));
  } catch (err) {
    yield put(playersRushingLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* playersRushingData() {
  yield takeLatest(LOAD_PLAYERS_RUSHING, getPlayersRushing);
  yield takeLatest(CHANGE_PAGE, getPlayersRushing);
  yield takeLatest(SORT_BY, getPlayersRushing);
  yield takeLatest(FILTER_BY_PLAYER_NAME, getPlayersRushing);
}
