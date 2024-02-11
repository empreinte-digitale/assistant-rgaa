import {call, select, takeEvery} from 'redux-saga/effects';
import {TOGGLE_POPUP} from '../actions/panel';
import {CLOSE_POPUP, OPEN_POPUP} from '../actions/runtime';
import {sendMessage} from '../api/runtime';
import {setTabState} from '../api/tabs';
import {getPageTabId, getPopupTabId} from '../selectors/panel';

/**
 *
 */
function* togglePopupWorker() {
	const state = yield select();
	const tabId = yield select(getPageTabId);
	const popupTabId = yield select(getPopupTabId);
	const message = popupTabId
		? {
				type: CLOSE_POPUP,
				tabId: popupTabId
		  }
		: {
				type: OPEN_POPUP,
				tabId
		  };

	yield call(setTabState, tabId, state);
	yield call(sendMessage, message);
}

/**
 *
 */
export function* watchTogglePopup() {
	yield takeEvery(TOGGLE_POPUP, togglePopupWorker);
}
