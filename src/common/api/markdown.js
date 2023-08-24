/**
 *
 */
export const replaceLocalUrls = (body, basePath) =>
	body.replace(/page:\/\/([a-z0-9/_-]+)/gi, (match, path) =>
		chrome.runtime.getURL(`${basePath}/${path}`)
	);
