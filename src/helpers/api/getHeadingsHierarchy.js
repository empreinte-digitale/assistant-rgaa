const HxPattern = /^h([1-6])$/i;

/**
 *
 */
const getHeadingLevel = (element) => {
	// If an aria-level attribute is set, it takes precedence
	// over hx levels.
	if (element.hasAttribute('aria-level')) {
		return parseInt(element.getAttribute('aria-level'), 10);
	}

	const matches = element.tagName.match(HxPattern);

	if (matches) {
		return parseInt(matches[1], 10);
	}

	// In case the semantics are provided by a role attribute
	// but no aria-level is specified, the default level is 2.
	// @see https://www.w3.org/TR/wai-aria-1.1/#heading
	if (element.getAttribute('role') === 'heading') {
		return 2;
	}

	return NaN;
};

/**
 *
 */
const getHeadingText = (element) => {
	if (element.innerText) {
		return element.innerText;
	}
	// try to get text from potential img alts
	const images = [].slice.call(element.querySelectorAll('img[alt]'));
	const imagesText = images
		.map((image) => image.getAttribute('alt'))
		.join(' - ');
	if (imagesText.length) {
		return imagesText;
	}

	return 'Erreur lors de la récupération du texte';
};

/**
 *
 */
export const withMissingHeadings = (hierarchy, text) => {
	const newHierarchy = [];
	let previousLevel = 0;

	hierarchy.forEach((heading) => {
		for (
			let missingLevel = previousLevel + 1;
			missingLevel < heading.level;
			missingLevel++
		) {
			newHierarchy.push({
				text,
				level: missingLevel,
				fake: true
			});
		}

		newHierarchy.push(heading);
		previousLevel = heading.level;
	});

	return newHierarchy;
};

/**
 *
 */
export default function getHeadingsHierarchy() {
	const headings = [].slice.call(
		document.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"]')
	);

	if (!headings.length) {
		return [];
	}

	return headings.map((element) => ({
		level: getHeadingLevel(element),
		text: getHeadingText(element),
		fake: false
	}));
}
