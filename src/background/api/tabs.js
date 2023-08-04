import {api} from '../../common/api/extension';

/**
 *
 */
export const sendMessageToTab = api('tabs.sendMessage');
export const createTab = api('tabs.create');

/**
 *
 */
const fetchCurrentTabApi = api('tabs.query');
const captureVisibleTabApi = api('tabs.captureVisibleTab');

/**
 *
 */
export const fetchCurrentTab = async () => {
	const query = {
		active: true,
		currentWindow: true
	};

	const tabs = await fetchCurrentTabApi(query);

	if (!tabs.length) {
		throw new Error('No tab found');
	}

	return tabs[0];
};

/**
 *
 */
export const captureVisibleTab = async (
	options = {
		format: 'png'
	}
) => {
	const source = await captureVisibleTabApi(null, options);
	const image = new Image();
	image.src = source;

	return image;
};

/**
 *
 */
export const closeTab = (id) => chrome.tabs.remove(id);

/**
 *
 */
export const onUpdate = (callback) =>
	chrome.tabs.onUpdated.addListener(callback);
