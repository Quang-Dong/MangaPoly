import {put, takeEvery, call} from 'redux-saga/effects';

import {
  CLICK,
  INCREASE,
  INCREASE_DONE,
  NAVIGATION,
} from '../redux/actions/types';

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Our worker Saga: will perform the async increment task
export function* incrementAsync(action) {
  yield call(delay, 1000);
  yield put({type: INCREASE_DONE, payload: action.payload});
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  yield takeEvery(NAVIGATION, incrementAsync);
}
