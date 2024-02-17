import {configureStore} from '@reduxjs/toolkit';
import React from 'react';
import {createRoot} from 'react-dom/client';
import {IntlProvider} from 'react-intl';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {setReferenceVersion} from '../common/actions/reference';
import {getReferenceOption} from '../common/api/reference';
import messages from '../common/messages/fr';
import reducer from '../common/reducers';
import saga from '../common/sagas';
import routes from './routes';

(async () => {
	const targetTabId = browser.devtools.inspectedWindow.tabId;
	const port = browser.runtime.connect({
		name: `${targetTabId}`
	});

	const sagaMiddleware = createSagaMiddleware({
		context: {
			port
		}
	});

	const store = configureStore({
		reducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(sagaMiddleware)
	});

	sagaMiddleware.run(saga);
	store.dispatch(setReferenceVersion(await getReferenceOption()));

	const root = createRoot(document.getElementById('panel'));
	const app = (
		<Provider store={store}>
			<IntlProvider locale="fr" messages={messages}>
				{routes(store)}
			</IntlProvider>
		</Provider>
	);

	root.render(app);
})();
