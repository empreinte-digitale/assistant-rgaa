import {put, select, call, takeEvery} from 'redux-saga/effects';
import {router} from '../../panel/routes';
import {
	getVersion,
	findTestResults,
	findCriteriaResults
} from '../selectors/imports';
import {setReferenceVersion} from '../actions/reference';
import {APPLY, setTestsResults, setCriteriaResults} from '../actions/imports';

/**
 *
 */
function* applyWorker() {
	const importVersion = yield select(getVersion);

	if (!importVersion) {
		return;
	}

	yield put(setReferenceVersion(importVersion));
	const testResults = yield select(findTestResults);
	const criteriaResults = yield select(findCriteriaResults);
	yield put(setTestsResults(testResults));
	yield put(setCriteriaResults(criteriaResults));
	yield call(router.navigate, '/');
}

/**
 *
 */
export function* watchApply() {
	yield takeEvery(APPLY, applyWorker);
}
