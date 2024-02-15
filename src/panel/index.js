import {configureStore} from '@reduxjs/toolkit';
import React from 'react';
import {createRoot} from 'react-dom/client';
import {IntlProvider} from 'react-intl';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {setPageInfo} from '../common/actions/panel';
import {setReferenceVersion} from '../common/actions/reference';
import {getReferenceOption} from '../common/api/reference';
import {getTabState} from '../common/api/tabs';
import messages from '../common/messages/fr';
import reducer from '../common/reducers';
import saga from '../common/sagas';
import routes from './routes';

console.log('panel');
const init = async () => {
	const targetTab = await browser.tabs.get(
		browser.devtools.inspectedWindow.tabId
	);

	// Used to observe the panel's lifecycle.
	// @see https://stackoverflow.com/a/77106777/2391359
	const port = browser.runtime.connect({
		name: `${targetTab.id}`
	});

	await port.postMessage({
		type: 'SETUP_HELPERS',
		tabId: browser.devtools.inspectedWindow.tabId
	});

	const sagaMiddleware = createSagaMiddleware({
		context: {
			port
		}
	});

	const preloadedState = await getTabState(targetTab.id);
	const store = configureStore({
		reducer,
		preloadedState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(sagaMiddleware)
	});

	sagaMiddleware.run(saga);

	store.dispatch(setReferenceVersion(await getReferenceOption()));
	store.dispatch(
		setPageInfo({
			tabId: targetTab.id,
			url: targetTab.url,
			title: targetTab.title,
			popupTabId: null
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
