import React, {Suspense} from 'react';
import {Provider} from 'react-redux';
import {FormattedMessage, IntlProvider} from 'react-intl';
import Router from './routes';
import getStore from './getStore';
import {Provider} from 'react-redux';
import messages from '../common/messages/fr';
import getStore from './getStore';

/**
 *	Registers the default locale for react-intl.
 */
const App = React.lazy(() =>
	getStore().then((store) => ({
		default: () => <Provider store={store}><Router /></Provider>
	}))
);

const Loader = (
	<p>
		<FormattedMessage id="Panel.loading" />
	</p>
);

export default () => (
	<IntlProvider locale="fr" messages={messages}>
		<p>toto</p>
		<Suspense fallback={<Loader />}>
			<App />
		</Suspense>
	</IntlProvider>
);
