import {truncate} from 'lodash';
import {connect} from 'react-redux';
import {getPageTitle} from '../../common/selectors/panel';
import {getVersion} from '../../common/selectors/reference';
import Header from './Header';

/**
 *
 */
const mapStateToProps = (state) => ({
	referenceVersion: getVersion(state),
	inPopup: false, // @TODO
	title: truncate(getPageTitle(state), {omission: '…'})
});

export default connect(mapStateToProps)(Header);
