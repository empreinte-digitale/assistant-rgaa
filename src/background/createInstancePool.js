import {has, get, unset, forEach, method} from 'lodash';
import createAppInstance from './createAppInstance';
import createOptionsInstance from './createOptionsInstance';

/**
 *
 */
export default function createInstancePool() {
	const instances = {};
	let optionsInstance;

	//
	const create = (id) => {
		const instance = createAppInstance(id);
		instances[id] = instance;
		return instance;
	};

	// deregisters the popup id and returns the original tab id.
	const switchToTab = (popupId) => {
		const instance = instances[popupId];
		const tabId = instance.removePopup();
		instances[tabId] = instance;
		delete instances[popupId];
		return tabId;
	};

	// Registers the popup id on which the instance runs.
	const switchToPopup = (tabId, popupId) => {
		const instance = instances[tabId];
		instance.setPopup(popupId);
		instances[popupId] = instance;
	};

	// Registers the popup id on which the instance runs.
	const getOptionsInstance = () => {
		if (!optionsInstance) {
			optionsInstance = createOptionsInstance();
		}

		return optionsInstance;
	};

	//
	const dispatch = (action) => forEach(instances, method('dispatch', action));

	return {
		create,
		switchToPopup,
		switchToTab,
		getOptionsInstance,
		dispatch,
		hasInstance: has.bind(null, instances),
		getInstance: get.bind(null, instances),
		removeInstance: unset.bind(null, instances)
	};
}
