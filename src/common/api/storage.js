export const getData = async (key, defaultData) => {
	const data = await browser.storage.session.get([key]);
	return data?.[key] || defaultData;
};

export const setData = (key, data) =>
	browser.storage.session.set({
		[key]: data
	});
