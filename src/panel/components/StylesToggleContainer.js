import {injectIntl} from 'react-intl';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {areStylesEnabled} from '../../common/selectors/styles';
import StylesToggle from './StylesToggle';
import {toggleStyles} from '../../common/actions/styles';

/**
 *
 */
const mapStateToProps = (state) => ({
	areStylesEnabled: areStylesEnabled(state)
});

/**
 *
 */
const mapDispatchToProps = (dispatch) => ({
	toggleStyles(enabled) {
		dispatch(toggleStyles(enabled));
	}
});

/**
 *
 */
export default compose(
	injectIntl,
	connect(mapStateToProps, mapDispatchToProps)
)(StylesToggle);
