import {all} from 'redux-saga/effects';
import * as criteria from './criteria';
import * as helpers from './helpers';
import * as imports from './imports';
import * as reference from './reference';
import * as styles from './styles';
import * as tests from './tests';

/**
 *
 */
export default function* sagas() {
	yield all([
		helpers.watchApply(),
		helpers.watchApplyAll(),
		helpers.watchRevert(),
		helpers.watchRevertAll(),
		imports.watchApply(),
		tests.watchEnable(),
		tests.watchDisable(),
		criteria.watchToggleCriterion(),
		reference.watchSetReferenceVersion(),
		styles.watchToggleStyles(),
		styles.watchApplyStyles(),
		styles.watchRevertStyles()
	]);
}
