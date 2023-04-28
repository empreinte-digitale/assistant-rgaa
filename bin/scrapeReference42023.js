#!/usr/bin/env node
const {marked} = require('marked');

/**
 * marked js Renderer
 */
const renderer = new marked.Renderer();

/**
 *
 * @param {string} href
 * @param {string | null} title
 * @param {string} text
 * @returns {string}
 */
renderer.link = function (href, title, text) {
	return `<a  href="https://accessibilite.numerique.gouv.fr/methode/glossaire/${href}" target="_blank" title="${
		title ?? text
	}">${text}</a>`;
};

/**
 *	Transforms data from version 4.1 of the RGAA reference into JSON.
 *
 *	@param {object} options - Options:
 *		- {string} source - Source URL.
 *		- {string} destination - Destination file.
 *		- {boolean} merge - Whether or not to merge the output
 *		- file with the existing one, if any.
 */
module.exports = (options) => (json) => {
	if (!json || typeof json !== 'string') {
		throw new Error('RGAA Criteria  Json file missing');
	}
	const rgaaJson = JSON.parse(json);
	return {
		name: 'RGAA 4.1.2 (2023)',
		version: '4.1.2-2023',
		themes: buildThemes(rgaaJson)
	};
};

/**
 * @param {object} rgaaJsonCriteria
 * @returns {Array} Array
 */
function buildThemes(rgaaJsonCriteria) {
	return rgaaJsonCriteria.topics.map((topic) => ({
		id: topic.number,
		title: `${topic.number}. ${topic.topic}`,
		criteria: parseCriteria(topic.criteria, topic.number)
	}));
}

/**
 * @param {object} criterias
 * @param {string} topicNumber
 * @returns  {object} Object
 */
function parseCriteria(criterias, topicNumber) {
	return criterias.map((criteria) => ({
		id: `${topicNumber}.${criteria.criterium.number}`,
		title: marked(criteria.criterium.title, {renderer}),
		level: getWcagLevel(criteria.criterium.references[0]?.wcag[0]),
		tests: getTests(
			criteria.criterium.tests,
			criteria.criterium.number,
			topicNumber
		)
	}));
}

/**
 * @param {string} wcag
 * @returns {string} String
 */
function getWcagLevel(wcag) {
	const matches = wcag.match(/\((A+)\)$/);
	return matches ? matches[1] : '';
}

/**
 * @param {object} tests
 * @param {number} criteriumId
 * @param {string} topicNumber
 * @return {Array<object>} Array[object]
 */
function getTests(tests, criteriumId, topicNumber) {
	return Object.entries(tests).map(([key, test]) => ({
		id: `${topicNumber}.${criteriumId}.${key}`,
		title: marked(formatTest(test), {renderer})
	}));
}

/**
 * @param {array<string>} lines
 * @return {string} String
 */
function formatTest(lines) {
	const paragraph = lines.shift();
	const list = lines.map((line) => `* ${line}`);
	return [paragraph, ...list].join('\n');
}
