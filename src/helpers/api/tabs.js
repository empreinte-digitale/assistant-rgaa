const HelpersScripts = ['dist/common.js', 'dist/helpers.js'];
const HelpersStyles = ['dist/helpers.css'];

// On Firefox, this will not work because of domain
// restrictions, resulting in the error "Missing host
// permission for the tab".
// @see https://forums.mozillazine.org/viewtopic.php?t=3112099
// @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts#restricted_domains
export const injectHelpersScripts = async (tabId) =>
	Promise.all([
		browser.scripting.insertCSS({
			target: {tabId},
			files: HelpersStyles
		}),
		browser.scripting.executeScript({
			target: {tabId},
			files: HelpersScripts
		})
	]);

export const removeHelpersScripts = async (tabId) =>
	browser.scripting.removeCSS({
		target: {tabId},
		files: HelpersStyles
	});
