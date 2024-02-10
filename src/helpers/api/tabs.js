const HelpersScripts = ['dist/common.js', 'dist/helpers.js'];
const HelpersStyles = ['dist/helpers.css'];

export const injectHelpersScripts = async (tabId) =>
	Promise.all([
		...HelpersStyles.map((file) =>
			browser.scripting.insertCSS({
				target: {tabId},
				files: [file]
			})
		),
		...HelpersScripts.map((file) =>
			browser.scripting.executeScript({
				target: {tabId},
				files: [file]
			})
		)
	]);
