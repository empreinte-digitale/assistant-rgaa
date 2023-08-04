import React from 'react';
import {IntlProvider, addLocaleData} from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import {Provider} from 'react-redux';
import renderNothingUntil from '~src/common/renderNothingUntil';
import {isOpen} from '~src/common/selectors/panel';
import messages from '../common/messages/fr';
import AppContainer from './components/AppContainer';
import getStore from './getStore';
/**
 *
 */
addLocaleData(fr);

const microstore = (v) => {
	let value = v;
	const subscribers = new Set();

	const subscribe = (subscriber) => {
		subscribers.add(subscriber);
		return () => {
			subscribers.delete(subscriber);
		};
	};

	const getSnapshot = () => open;

	const notify = (v) => {
		subscribers.forEach((s) => {
			s(v);
		});
	};

	const update = (v) => {
		value = v;
		notify(v);
	};

	return {
		subscribe,
		getSnapshot,
		update
	};
};

const open = microstore(false);

const App2 = renderNothingUntil(isOpen)(AppContainer);

const App = React.lazy(() =>
	getStore().then((store) => ({
		default: () => (
			<Provider store={store}>
				<IntlProvider locale="fr" messages={messages}>
					<App2 />
				</IntlProvider>
			</Provider>
		)
	}))
);

export default () => <Suspense>{o ? <App /> : null}</Suspense>;

/*
export default () => {
	const o = useSyncExternalStore(open.subscribe, open.getSnapshot);

	return (
	<Suspense>
			{o? <App /> : null}
		</Suspense>
)}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	Promise.resolve(message)
		// eslint-disable-next-line consistent-return
		.then(({type}) => {
			// eslint-disable-next-line default-case
			switch (type) {
				case OPEN_PANEL:
					open.update(true);
					break;

				case CLOSE_PANEL:
					open.update(false);
					break;
			}
		})
		.then(() => sendResponse({message: 'ok'}));

	// Returning true states that sendResponse is asynchronous
	return true;
});
*/
