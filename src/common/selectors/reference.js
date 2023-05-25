import {map, filter, property} from 'lodash';

/**
 *
 */
export const getVersion = property('reference.reference.version');

/**
 *
 */
export const isLoaded = (state) => !!getVersion(state);

/**
 *
 */
export const getAllThemes = property('reference.themes');

/**
 *
 */
export const getAllCriteria = property('reference.criteria');

/**
 *
 */
export const getCriteriaIds = (state) => map(getAllCriteria(state), 'id');

/**
 *
 */
export const getAllCriteriaByTheme = (state, themeId) =>
	filter(getAllCriteria(state), ['themeId', themeId]);

/**
 *
 */
export const getAllTests = property('reference.tests');

/**
 *
 */
export const getTestIds = (state) => map(getAllTests(state), 'id');

/**
 *
 */
export const getAllTestsByCriterion = (state, criterionId) =>
	filter(getAllTests(state), ['criterionId', criterionId]);

/**
 *
 */
export const getRefLinksById = (state, criterionId) =>
	state.reference.criteria[criterionId]?.references ?? [];

/**
 *
 */
export const getSpecialCasesById = (state, criterionId) =>
	state.reference.criteria[criterionId]?.specialCases ?? null;

/**
 *
 */
export const getTechnicalNotesById = (state, criterionId) =>
	state.reference.criteria[criterionId]?.technicalNotes ?? null;
