import React, {Suspense, useSyncExternalStore} from 'react';
import {IntlProvider} from 'react-intl';
import {Provider, useSelector} from 'react-redux';
import {isOpen} from '~src/common/selectors/panel';
import messages from '../common/messages/fr';
import App from './components/App';
import getStore from './getStore';

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

const App2 = () => {
	const open = useSelector(isOpen);
	return open ? <App /> : null
}

const App3 = React.lazy(() =>
	getStore().then((store) => ({
		default: () => (
			<Provider store={store}>
				<IntlProvider locale="fr" messages={messages}>
					<p>test</p>
					<App2 />
				</IntlProvider>
			</Provider>
		)
	}))
);

//export default () => <Suspense>{o ? <App3 /> : null}</Suspense>;


export default () => {
	const o = useSyncExternalStore(open.subscribe, open.getSnapshot);

	return (
	<Suspense>
			{o? <App3 /> : null}
		</Suspense>
)}

console.log('before register container')
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.log('register container')
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
