import React from 'react';
import {createRoot} from 'react-dom/client';
import {IntlProvider} from 'react-intl';
import {Provider} from 'react-redux';
import {setPageInfo} from '../common/actions/panel';
import {setReferenceVersion} from '../common/actions/reference';
import {getReferenceOption} from '../common/api/reference';
import {fetchCurrentTab, getTabState} from '../common/api/tabs';
import createStore from '../common/createStore';
import messages from '../common/messages/fr';
import reducer from '../common/reducers';
import sagas from '../common/sagas';
import routes from './routes';

const init = async () => {
	// Either gets the current tab or the one specified in the URL.
	const query = new URLSearchParams(window.location.search);
	const popupTabId = query.get('tabId');
	const tab = popupTabId
		? await browser.tabs.get(parseInt(popupTabId, 10))
		: await fetchCurrentTab();

	// Used to observe the panel's lifecycle.
	// @see https://stackoverflow.com/a/77106777/2391359
	browser.runtime.connect({
		name: `${tab.id}`
	});

	const state = await getTabState(tab.id);
	const store = createStore(reducer, sagas, state);

	store.dispatch(setReferenceVersion(await getReferenceOption()));
	store.dispatch(
		setPageInfo({
			tabId: tab.id,
			url: tab.url,
			title: tab.title,
			popupTabId
		})
	);

	const root = createRoot(document.getElementById('panel'));
	const app = (
		<Provider store={store}>
			<IntlProvider locale="fr" messages={messages}>
				{routes(store)}
			</IntlProvider>
		</Provider>
	);

	root.render(app);

	// @TODO
	// setTabState(tab.id, store.getState());
};

init();
