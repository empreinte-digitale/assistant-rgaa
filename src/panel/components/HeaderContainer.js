import {truncate} from 'lodash';
import {connect} from 'react-redux';
import {
	getPageTabId,
	getPageTitle,
	getPopupTabId
} from '../../common/selectors/panel';
import {getVersion} from '../../common/selectors/reference';
import Header from './Header';
import {togglePopup} from '../../common/actions/panel';

/**
 *
 */
const mapStateToProps = (state) => ({
	referenceVersion: getVersion(state),
	isPopup: !!getPopupTabId(state),
	title: truncate(getPageTitle(state), {omission: '…'}),
	tabId: getPageTabId(state)
});

const mapDispatchToProps = (dispatch) => ({
	togglePopup(tabId) {
		dispatch(togglePopup(tabId));
	}
});

const mergeProps = (props, actions) => ({
	...props,
	...actions,
	onTogglePopup() {
		actions.togglePopup(props.tabId);
	}
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Header);
