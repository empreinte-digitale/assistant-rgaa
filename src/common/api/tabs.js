import {INVALID_RESPONSE} from '../actions/runtime';
import {clearData, getData, setData} from './storage';

/**
 *
 */
export const fetchCurrentTab = async () => {
	const query = {
		active: true,
		currentWindow: true
	};

	const tabs = await browser.tabs.query(query);

	if (!tabs.length) {
		throw new Error('No tab found');
	}

	return tabs[0];
};

/**
 *
 */
export const sendMessage = async (port, tabId, data) => {
	const response = await port.postMessage({
		type: 'SEND_MESSAGE',
		tabId,
		data
	});

	if (response === INVALID_RESPONSE) {
		throw new Error(response);
	}

	return response;
};

export const getTabState = (tabId) => getData(`${tabId}.state`, {});
export const setTabState = (tabId, state) => setData(`${tabId}.state`, state);
export const clearTabState = (tabId) => clearData(`${tabId}.state`);

export const getTabPopupId = (tabId) => getData(`${tabId}.popup`);
export const setTabPopupId = (tabId, popupId) =>
	setData(`${tabId}.popup`, popupId);
export const clearTabPopupId = (tabId) => clearData(`${tabId}.popup`);
