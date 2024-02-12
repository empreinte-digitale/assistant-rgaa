import {PanelPage} from './tabs';

const isChromeApi = () =>
	typeof chrome !== 'undefined' && 'sidePanel' in chrome;

const openBrowserSidebar = (tabId) => {
	console.log(browser);
	browser.sidebarAction.setPanel({
		tabId,
		panel: browser.runtime.getURL(PanelPage)
	});

	browser.sidebarAction.open();
};

const openChromeSidebar = (tabId) => {
	chrome.sidePanel.setOptions({
		tabId,
		path: PanelPage,
		enabled: true
	});

	chrome.sidePanel.open({
		tabId
	});
};

export const openSidebar = (tabId) => {
	if (isChromeApi()) {
		openChromeSidebar(tabId);
	} else {
		console.log('open sidebar');
		openBrowserSidebar(tabId);
	}
};

const closeBrowserSidebar = (tabId) => {
	browser.sidebarAction.setPanel({
		tabId,
		panel: null
	});
};

const closeChromeSidebar = (tabId) => {
	chrome.sidePanel.setOptions({
		tabId,
		path: PanelPage,
		enabled: false
	});
};

export const closeSidebar = (tabId) => {
	if (isChromeApi()) {
		closeChromeSidebar(tabId);
	} else {
		closeBrowserSidebar(tabId);
	}
};
