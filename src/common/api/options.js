/**
 *
 */
export const getOption = (key) =>
	browser.storage.local
		.get('options')
		.then(({options = {}}) => (key in options ? options[key] : options));

/**
 *
 */
export const setOption = (key, value) =>
	browser.storage.local.get('options').then(({options}) =>
		browser.storage.local.set({
			options: {
				...options,
				[key]: value
			}
		})
	);
