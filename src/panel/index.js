import React from 'react';
import {FormattedMessage, IntlProvider, addLocaleData} from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import {Provider} from 'react-redux';
import messages from '../common/messages/fr';
import getStore from './getStore';
import routes from './routes';

/**
 *	Registers the default locale for react-intl.
 */
addLocaleData(fr);

const App = React.lazy(() =>
	getStore().then((store) => ({
		default: () => <Provider store={store}>{routes(store)}</Provider>
	}))
);

const Loader = (
	<p>
		<FormattedMessage id="Panel.loading" />
	</p>
);

export default () => (
	<IntlProvider locale="fr" messages={messages}>
		<Suspense fallback={<Loader />}>
			<App />
		</Suspense>
	</IntlProvider>
);
