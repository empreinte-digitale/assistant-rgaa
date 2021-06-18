import {TOGGLE_MENU, SAVE_SCROLL_POSITION} from '../actions/themes';

/**
 *
 */
export const initialState = {
	scrollPosition: 0,
	menuIsOpen: false
};

/**
 *
 */
export default function themes(state = initialState, {type, payload}) {
	switch (type) {
		case TOGGLE_MENU:
			return {
				...state,
				menuIsOpen: payload
			};

		case SAVE_SCROLL_POSITION:
			return {
				...state,
				scrollPosition: payload
			};

		default:
			return state;
	}
}
