import {PanelPage} from '../background/api/tabs';

const init = async () => {
	const p = await browser.devtools.panels.create(
		'Assistant RGAA',
		'img/icon-96.png',
		PanelPage
	);

	console.log(p);
};

init();
