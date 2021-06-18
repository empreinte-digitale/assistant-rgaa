/**
 *
 */
export const OPTIONS_FILE = 'pages/options.html';

/**
 *
 */
export const open = () =>
	new Promise((resolve, reject) => {
		chrome.runtime.openOptionsPage(() => {
			if (!chrome.runtime.lastError) {
				resolve();
			} else {
				reject(chrome.runtime.lastError);
			}
		});
	});
