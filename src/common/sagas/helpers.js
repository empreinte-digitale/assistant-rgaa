import {call, getContext, put, select, takeEvery} from 'redux-saga/effects';
import {
	APPLY,
	APPLY_ALL,
	REVERT,
	REVERT_ALL,
	applyHelpers,
	revertHelpers
} from '../actions/helpers';
import {getHelpersByTest} from '../selectors/helpers';
import {getPageTabId} from '../selectors/panel';
import {getEnabled} from '../selectors/tests';
import {sendMessage} from '../api/tabs';

/**
 *
 */
function* applySaga(action) {
	const port = yield getContext('port');
	const tabId = yield select(getPageTabId);
	yield call(sendMessage, port, tabId, action);
}

/**
 *
 */
function* revertSaga(action) {
	const port = yield getContext('port');
	const tabId = yield select(getPageTabId);
	yield call(sendMessage, port, tabId, action);
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
