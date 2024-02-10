import {INVALID_RESPONSE} from '../actions/runtime';

/**
 *
 */
export const sendMessage = async (message, tabId, data) => {
	const response = browser.tabs.sendMessage(message, tabId, data);

	if (response === INVALID_RESPONSE) {
		throw new Error(response);
	}

	return response;
};
