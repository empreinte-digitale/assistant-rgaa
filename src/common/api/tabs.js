import {INVALID_RESPONSE} from '../actions/runtime';

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
export const sendMessage = async (port, data) => {
	const response = await port.postMessage({
		type: 'SEND_MESSAGE',
		data
	});

	if (response === INVALID_RESPONSE) {
		throw new Error(response);
	}

	return response;
};
