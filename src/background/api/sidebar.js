import {PanelPage} from './tabs';

export const openSidebar = (tabId) => {
	chrome.sidePanel.setOptions({
		tabId,
		path: PanelPage,
		enabled: true
	});

	chrome.sidePanel.open({
		tabId
	});
};

export const closeSidebar = (tabId) => {
	chrome.sidePanel.setOptions({
		tabId,
		path: PanelPage,
		enabled: false
	});
};
