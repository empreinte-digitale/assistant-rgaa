import {debounce} from 'lodash';
import {sendMessage} from '../../common/api/runtime';
import getHeadingsHierarchy from '../api/getHeadingsHierarchy';
import {GET} from '../actions/headingsHierarchy';
import HeadingsHierarchyContainer from '../components/HeadingsHierarchyContainer';



/**
 *
 */
const sendHierarchy = () =>
	sendMessage({
		type: GET,
		payload: getHeadingsHierarchy()
	});

/**
 *
 */
const observer = new MutationObserver(
	debounce(sendHierarchy, 300)
);

/**
 *
 */
export const component = () =>
	HeadingsHierarchyContainer;

/**
 *	Describes the helper.
 */
export const describe = (intl) =>
	intl.formatHTMLMessage({
		id: 'Helper.headingsHierarchy'
	});

/**
 *
 */
export const apply = () => {
	sendHierarchy();
	observer.observe(document.body, {
		childList: true
	});
};

/**
 *
 */
export const revert = () => {
	observer.disconnect();
};
