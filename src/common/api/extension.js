import {get} from 'lodash';

/**
 *	Tells if the extension currently runs on chrome.
 */
const IS_CHROME =
	typeof browser === 'undefined' || browser.runtime === undefined;

/**
 *	Returns a cross browser version of a browser API method.
 */
export const api = (method) =>
	IS_CHROME ? get(chrome, method) : get(browser, method);
