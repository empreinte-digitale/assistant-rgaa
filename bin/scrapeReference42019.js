#!/usr/bin/env node
const _ = require('lodash');
const cheerio = require('cheerio');
const installResolveLinksPlugin = require('./resolveLinksPlugin');
const installRemoveChildrenPlugin = require('./removeChildrenPlugin');



/**
 *	Scrapes version 4 of the RGAA reference into JSON.
 *
 *	@param {object} options - Options:
 *		- {string} source - Source URL.
 *		- {string} destination - Destination file.
 *		- {boolean} merge - Whether or not to merge the output
 *			file with the existing one, if any.
 */
module.exports = (options) => (html) => {
	const $ = cheerio.load(html, {
		normalizeWhitespace: true,
		decodeEntities: false
	});

	installResolveLinksPlugin($);
	installRemoveChildrenPlugin($);

	const scrapeTest = (i, el) => {
		const element = $(el);
		const title = element
			.resolveLinks(options.source)
			.html()
			.trim();
		const idMatches = /^<span class="test">Test (\d+\.\d+\.\d+)/i.exec(title);

		if (idMatches === null) {
			return null;
		}

		const id = idMatches[1];

		let formattedTitle = title.replace(
			/^<span class="test">Test \d+\.\d+\.\d+<\/span>&#160;:\s/i,
			''
		);

		if (element.find('ul').length) {
			let conditions = element.find('ul')
				.resolveLinks(options.source)
				.html()
				.trim();
			conditions = `<ul>${conditions}</ul>`;
			formattedTitle = formattedTitle.replace(
				/<ul>(.*)<\/ul>/,
				''
			);
			formattedTitle = `${formattedTitle}${conditions}`;
		} else {
			formattedTitle = `${formattedTitle}`;
		}

		return {id, title: formattedTitle};
	};

	const scrapeCriterion = (i, el) => {
		const element = $(el);
		const title = element
			.find('h4')
			.removeChildren('button')
			.resolveLinks(options.source)
			.html()
			.trim();

		const idMatches = /^Critère (\d+)\.(\d+)/i.exec(title);

		if (idMatches === null) {
			return null;
		}

		const id = `${idMatches[1]}.${idMatches[2]}`;

		const level = element.attr('data-level');

		const formattedTitle = title.replace(
			/^Critère \d+\.\d+\. /i,
			''
		);

		const testElements = $(`li[id^="test-${idMatches[1]}-${idMatches[2]}"]`);
		const tests = testElements.map(scrapeTest).get();

		return {id, title: formattedTitle, level, tests};
	};

	const scrapeTheme = (i, el) => {
		const element = $(el);
		const title = element
			.resolveLinks(options.source)
			.html()
			.trim();

		const idMatches = /^(\d+)/i.exec(title);

		if (idMatches === null) {
			return null;
		}

		const id = idMatches[1];
		const criterionElements = $(`article[id^="crit-${id}"]`);
		const criteria = criterionElements.map(scrapeCriterion).get();

		return {id, title, criteria};
	};

	const scrapeThemes = () =>
		$('main #criteres h3').map(scrapeTheme).get();

	return {
		name: 'RGAA 4-2019',
		version: '4-2019',
		themes: scrapeThemes()
	};
};
