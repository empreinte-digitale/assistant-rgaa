#!/usr/bin/env node
const {marked} = require('marked');
const {isEmpty} = require('lodash');

const accessGouvUrl =
	'https://accessibilite.numerique.gouv.fr/methode/glossaire/';
const w3cTechniquesUrl = 'https://www.w3.org/WAI/WCAG21/Techniques/';
const w3cWcag21FrUrl = 'https://www.w3.org/Translations/WCAG21-fr/';

function externalLinksRenderer(link) {
	const renderer = new marked.Renderer();

	renderer.link = (href, title, text) => {
		const matches = href.match(/(https?:\/\/[^\s]+)/g);
		const newHref = matches ? matches[0] : link + href;
		const newTitle = `${title ?? text} - nouvelle fenêtre`;

		return `<a href="${newHref}" title="${newTitle}" target="_blank">${text}</a>`;
	};

	return renderer;
}

/**
 *	Transforms data from version 4.1 of the RGAA reference into JSON.
 *
 *	@param {object} options - Options:
 *		- {string} source - Source URL.
 *		- {string} destination - Destination file.
 *		- {boolean} merge - Whether or not to merge the output
 *		- file with the existing one, if any.
 */
module.exports = (json) => {
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
		id: `${topic.number}`,
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
		title: marked(criteria.criterium.title, {
			renderer: externalLinksRenderer(accessGouvUrl)
		}),
		level: `${getWcagLevel(criteria.criterium.references[0]?.wcag[0])}`,
		tests: getTests(
			criteria.criterium.tests,
			criteria.criterium.number,
			topicNumber
		),
		specialCases: formatSpecialCasesToMarkdown(
			criteria.criterium?.particularCases
		),
		technicalNotes: formatTechnicalNotesToMarkdown(
			criteria.criterium?.technicalNote
		),
		references: [
			{
				wcag: marked(
					getWcagMatches(criteria.criterium.references[0]?.wcag),
					{
						renderer: externalLinksRenderer(w3cWcag21FrUrl)
					}
				)
			},
			{
				techniques: marked(
					getWcagTechniques(criteria.criterium.references[1]?.techniques),
					{
						renderer: externalLinksRenderer(w3cTechniquesUrl)
					}
				)
			}
		]
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
		title: marked(formatTest(test), {
			renderer: externalLinksRenderer(accessGouvUrl)
		})
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

/**
 * @param {array} wcag
 */
function getWcagMatches(wcag) {
	return wcag
		.map((v) => {
			let hashUrl = v.match(/([A-Z])\w+/g);
			if (hashUrl !== null) {
				hashUrl.unshift('#');
				hashUrl = hashUrl.join('-').toLowerCase();
			} else {
				hashUrl = '#';
			}
			return ` * [${v.match(/\d+/g).join('.')} (${getWcagLevel(
				v
			)})](${hashUrl})`;
		})
		.join('\n');
}

const wcagCategories = {
	H: 'html',
	G: 'general',
	C: 'css',
	F: 'failures',
	A: 'aria',
	S: 'client-side-script'
};
/**
 * @param {object} techniques
 * @returns {string} String
 */
function getWcagTechniques(techniques) {
	if (isEmpty(techniques)) {
		return '';
	}
	const buildMdLink = (uri, ref) =>
		`[${ref.join('')}](${uri}/${ref.join('')})`;
	return Object.values(techniques)
		.map((v) => {
			const ref = v.split('');
			return ` * ${buildMdLink(wcagCategories[ref[0]], ref)}`;
		})
		.join(' \n');
}

/**
 *
 * @param {Array<object|string>|undefined} specialCases
 */
function formatSpecialCasesToMarkdown(specialCases) {
	if (!specialCases) {
		return null;
	}

	return specialCases.map((specialCase) => {
		if (typeof specialCase === 'string') {
			return marked(specialCase, {
				renderer: externalLinksRenderer(accessGouvUrl)
			});
		}

		return {
			case: marked(specialCase.ul.join('\n'), {
				renderer: externalLinksRenderer(accessGouvUrl)
			})
		};
	});
}

/**
 *
 * @param {Array<string>} technicalNotes
 */
function formatTechnicalNotesToMarkdown(technicalNotes) {
	if (!technicalNotes) {
		return null;
	}

	return technicalNotes.map((note) => {
		if (typeof note === 'string') {
			return marked(note, {
				renderer: externalLinksRenderer(accessGouvUrl)
			});
		}
		return marked(note.ul.join('\n').replace(',', '\n'), {
			renderer: externalLinksRenderer(accessGouvUrl)
		});
	});
}
