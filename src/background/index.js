import {
	CREATE_TAB,
	GET_CURRENT_TAB,
	GET_PIXEL,
	INVALID_RESPONSE,
	VALIDATE_PAGE,
	VIEW_PAGE_SOURCE
} from '../common/actions/runtime';
import {getPixelAt} from '../common/api/image';
import {createMessageHandler} from '../common/api/runtime';
import {fetchCurrentTab} from '../common/api/tabs';
import {validateLocalPage} from '../common/api/validateLocalPage';
import {viewSource} from '../common/api/viewSource';
import {injectHelpersScripts} from '../helpers/api/tabs';
import {captureVisibleTab} from './api/tabs';

browser.runtime.onConnect.addListener(async (port) => {
	const targetTabId = parseInt(port.name, 10);
	await injectHelpersScripts(targetTabId);

	const handler = createMessageHandler(async (message) => {
		switch (message.type) {
			case 'SEND_MESSAGE':
				return browser.tabs.sendMessage(targetTabId, message.data);

			default:
				return INVALID_RESPONSE;
		}
	});

	port.onMessage.addListener(handler);
	port.onDisconnect.addListener(async () => {
		port.onMessage.removeListener(handler);
	});
});

browser.runtime.onMessage.addListener(
	createMessageHandler(async (message) => {
		switch (message.type) {
			// sends the store's state to the instance.
			case GET_PIXEL:
				return captureVisibleTab().then((image) =>
					getPixelAt(image, message.x, message.y)
				);

			// sends current tab's info to the instance.
			case GET_CURRENT_TAB:
				return fetchCurrentTab();

			case VALIDATE_PAGE:
				return validateLocalPage(message.url);

			case VIEW_PAGE_SOURCE:
				return viewSource(message.url);

			// create a tab with the given url, next to the current tab
			case CREATE_TAB:
				return fetchCurrentTab().then((currentTab) =>
					browser.tabs.create({
						url: message.url,
						index: currentTab.index + 1
					})
				);

			default:
				return INVALID_RESPONSE;
		}
	})
);
