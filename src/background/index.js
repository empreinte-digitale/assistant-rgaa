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
import {clearTabState, fetchCurrentTab} from '../common/api/tabs';
import {validateLocalPage} from '../common/api/validateLocalPage';
import {viewSource} from '../common/api/viewSource';
import {injectHelpersScripts} from '../helpers/api/tabs';
import {captureVisibleTab} from './api/tabs';

console.log('background');
/*
browser.sidebarAction.setPanel({
	panel: null
});

// We're avoiding promises (and thus async/await) here,
// because of a sneaky chrome bug.
// The call to sidePanel.open() must be done under 1ms after
// a click on the action to be considered initiated by the
// user.
// @see https://issues.chromium.org/issues/40929586
browser.action.onClicked.addListener((tab) => {
	console.log('action', browser);
	openSidebar(tab.id);
});
*/

browser.runtime.onConnect.addListener(async (port) => {
	const handler = createMessageHandler(async (message) => {
		console.log(message);
		switch (message.type) {
			case 'SETUP_HELPERS': {
				await injectHelpersScripts(message.tabId);
				return true;
			}

			case 'SEND_MESSAGE':
				return browser.tabs.sendMessage(message.tabId, message.data);

			default:
				return INVALID_RESPONSE;
		}
	});

	port.onMessage.addListener(handler);
	port.onDisconnect.addListener(() => {
		port.onMessage.removeListener(handler);
	});
});

browser.tabs.onRemoved.addListener(async (tabId) => {
	await clearTabState(tabId);
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
