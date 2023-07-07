/**
 *
 */
export const TOGGLE = 'common/styles/TOGGLE';
export const APPLY = 'common/styles/APPLY';
export const REVERT = 'common/styles/REVERT';

/**
 *
 */
export const toggleStyles = (enabled) => ({
	type: TOGGLE,
	payload: enabled
});

/**
 *
 */
export const applyStyles = () => ({
	type: APPLY,
	payload: {}
});

/**
 *
 */
export const revertStyles = () => ({
	type: REVERT,
	payload: {}
});
