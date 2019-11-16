import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import request from 'utils/request';

import { LOAD_PLAYERS_RUSHING } from './constants';
import {
  playersRushingLoaded,
  playersRushingLoadingError,
} from './actions';


export function* getPlayersRushing() {
  const requestURL = 'http://localhost:8000/players_rushing';

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
}
