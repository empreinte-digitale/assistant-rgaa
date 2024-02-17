import {PanelPage} from './tabs';

const isChromeApi = () =>
	typeof chrome !== 'undefined' && 'sidePanel' in chrome;

const openBrowserSidebar = (tabId) => {
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
		openBrowserSidebar(tabId);
	}
};

const closeBrowserSidebar = (tabId) => {
	browser.sidebarAction.setPanel({
		tabId,
		panel: null
	});

	browser.sidebarAction.close();
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

export const moveToPopup = async (tabId) => {
	await browser.windows.create({
		url: `${browser.runtime.getURL(PanelPage)}?tabId=${tabId}`,
		type: 'popup'
	});

	await closeSidebar(tabId);
};

export const moveToSidebar = async (tabId, popupTabId) => {
	await browser.tabs.remove(popupTabId);
	await openSidebar(tabId);
};
