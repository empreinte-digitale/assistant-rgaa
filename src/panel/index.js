import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {IntlProvider, addLocaleData} from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import routes from './routes';
import getStore from './getStore';
import messages from '../common/messages/fr';

/**
 *	Registers the default locale for react-intl.
 */
addLocaleData(fr);

getStore()
	.then((store) => (
		<Provider store={store}>
			<IntlProvider locale="fr" messages={messages}>
				{routes(store)}
			</IntlProvider>
		</Provider>
	))
	.then((app) => createRoot(document.getElementById('panel')).render(app));
