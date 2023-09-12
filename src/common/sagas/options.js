import {call, takeEvery} from 'redux-saga/effects';
import {open} from '../../background/api/options';
import {OPEN} from '../actions/options';

/**
 *
 */
function* openWorker() {
	yield call(open);
}

/**
 *
 */
export function* watchOpen() {
	yield takeEvery(OPEN, openWorker);
}
