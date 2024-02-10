import {
	CLOSE_POPUP,
	CREATE_TAB,
	GET_CURRENT_TAB,
	GET_PIXEL,
	INVALID_RESPONSE,
	OPEN_POPUP,
	VALIDATE_PAGE,
	VIEW_PAGE_SOURCE
} from '../common/actions/runtime';
import {getPixelAt} from '../common/api/image';
import {createMessageHandler} from '../common/api/runtime';
import {validateLocalPage} from '../common/api/validateLocalPage';
import {viewSource} from '../common/api/viewSource';
import {captureVisibleTab, fetchCurrentTab} from './api/tabs';

browser.runtime.onMessage.addListener(
	createMessageHandler((message) => {
		switch (message.type) {
			// if the instance runs in a tab, opens a popup and
			// indexes the instance on the new tab id,
			case OPEN_POPUP:
				// @TODO
				return INVALID_RESPONSE;

			// if the instance runs in a popup, desindexes it and
			// closes it.
			case CLOSE_POPUP:
				// @TODO
				return INVALID_RESPONSE;

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
