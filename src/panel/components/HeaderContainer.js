import {connect} from 'react-redux';
import {getVersion} from '../../common/selectors/reference';
import Header from './Header';

/**
 *
 */
const mapStateToProps = (state) => ({
	referenceVersion: getVersion(state)
});

export default connect(mapStateToProps)(Header);
