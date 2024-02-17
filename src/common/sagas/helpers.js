import {call, getContext, put, select, takeEvery} from 'redux-saga/effects';
import {
	APPLY,
	APPLY_ALL,
	REVERT,
	REVERT_ALL,
	applyHelpers,
	revertHelpers
} from '../actions/helpers';
import {sendMessage} from '../api/tabs';
import {getHelpersByTest} from '../selectors/helpers';
import {getEnabled} from '../selectors/tests';

/**
 *
 */
function* applySaga(action) {
	const port = yield getContext('port');
	yield call(sendMessage, port, action);
}

/**
 *
 */
function* revertSaga(action) {
	const port = yield getContext('port');
	yield call(sendMessage, port, action);
}

/**
 *
 */
function* applyAllSaga() {
	const enabledTests = yield select(getEnabled);

	// eslint-disable-next-line no-restricted-syntax
	for (const test of enabledTests) {
		const helpers = yield select(getHelpersByTest, test.id);
		yield put(applyHelpers(test.id, helpers));
	}
}

/**
 *
 */
function* revertAllSaga() {
	const enabledTests = yield select(getEnabled);

	// eslint-disable-next-line no-restricted-syntax
	for (const test of enabledTests) {
		const helpers = yield select(getHelpersByTest, test.id);
		yield put(revertHelpers(test.id, helpers));
	}
}

/**
 *
 */
export function* watchApply() {
	yield takeEvery(APPLY, applySaga);
}

/**
 *
 */
export function* watchRevert() {
	yield takeEvery(REVERT, revertSaga);
}

/**
 *
 */
export function* watchApplyAll() {
	yield takeEvery(APPLY_ALL, applyAllSaga);
}

/**
 *
 */
export function* watchRevertAll() {
	yield takeEvery(REVERT_ALL, revertAllSaga);
}
