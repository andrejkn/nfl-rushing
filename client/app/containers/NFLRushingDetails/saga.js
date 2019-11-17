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
} from './constants';

import {
  playersRushingLoaded,
  playersRushingLoadingError,
} from './actions';

import {
  makeSelectSortBy,
} from './selectors';

export function* getPlayersRushing() {
  const sortByState = yield select(makeSelectSortBy());
  const sortByParametersMap = {
    total_rushing_yards: 'TotalRushingYards',
    longest_rush: 'LongestRush',
    total_rushing_touchdowns: 'TotalRushingTouchdowns',
  };

  const sortByParameters = [
    'total_rushing_yards',
    'longest_rush',
    'total_rushing_touchdowns',
  ].reduce((acc, param) => (sortByState[param] ? `${acc}&order_by=${sortByParametersMap[param]}` : acc), '');

  const requestURL = `http://localhost:8000/players_rushing?${sortByParameters}`;

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL);
    yield put(playersRushingLoaded(data.items));
  } catch (err) {
    yield put(playersRushingLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* playersRushingData() {
  yield takeLatest(LOAD_PLAYERS_RUSHING, getPlayersRushing);
  yield takeLatest(SORT_BY, getPlayersRushing);
}
