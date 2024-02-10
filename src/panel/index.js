import React from 'react';
import {createRoot} from 'react-dom/client';
import {IntlProvider} from 'react-intl';
import {Provider} from 'react-redux';
import {fetchCurrentTab} from '../background/api/tabs';
import {setPageInfo} from '../common/actions/panel';
import {setReferenceVersion} from '../common/actions/reference';
import {getReferenceOption} from '../common/api/reference';
import {getData, setData} from '../common/api/storage';
import createStore from '../common/createStore';
import messages from '../common/messages/fr';
import reducer from '../common/reducers';
import {injectHelpersScripts} from '../helpers/api/tabs';
import routes from './routes';
import sagas from '../common/sagas/sagas';

const root = createRoot(document.getElementById('panel'));
let cleanup = () => {};

const init = async (tab) => {
	cleanup();

	const state = await getData(`${tab.id}.state`, {});
	const store = createStore(reducer, sagas, state);

	store.dispatch(setReferenceVersion(await getReferenceOption()));
	store.dispatch(
		setPageInfo({
			tabId: tab.id,
			url: tab.url,
			title: tab.title
		})
	);

	await injectHelpersScripts(tab.id);

	const app = (
		<Provider store={store}>
			<IntlProvider locale="fr" messages={messages}>
				{routes(store)}
			</IntlProvider>
		</Provider>
	);

	root.render(app);

	cleanup = () => {
		setData(`${tab.id}.state`, store.getState());
	};
};

browser.tabs.onActivated.addListener(async (tab) => {
	init(await browser.tabs.get(tab.tabId));
});

fetchCurrentTab().then(init);
