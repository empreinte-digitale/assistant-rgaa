import {TOGGLE} from '../actions/styles';

/**
 *
 */
export const initialState = {
	enabled: true
};

/**
 *
 */
export default function styles(state = initialState, {type, payload}) {
	switch (type) {
		case TOGGLE:
			return {
				...state,
				enabled: payload
			};

		default:
			return state;
	}
}
