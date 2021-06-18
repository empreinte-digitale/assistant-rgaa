const storage = chrome.storage.local;
const runtime = chrome.runtime;

const setItem = (key, data) =>
	new Promise((resolve, reject) => {
		storage.set({[key]: data}, () => {
			if (runtime.lastError) {
				reject(runtime.lastError);
			}
			resolve();
		});
	});

const getItem = (key) =>
	new Promise((resolve, reject) => {
		storage.get(key, (item) => {
			if (runtime.lastError) {
				reject(runtime.lastError);
			}
			const data = item[key] || item;
			resolve(data);
		});
	});

export default {
	getItem,
	setItem
};
