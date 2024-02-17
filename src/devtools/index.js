import {PanelPage} from '../background/api/tabs';

(async () => {
	try {
		await browser.devtools.panels.create(
			'Assistant RGAA',
			'/img/icon-48.png',
			PanelPage
		);
	} catch (e) {
		console.error(e);
	}
})();
