import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {IntlProvider} from 'react-intl';
import {noop} from 'lodash';
import messages from '../common/messages/fr';
import {OPEN_PANEL, CLOSE_PANEL} from '../common/actions/runtime';
import getStore from './getStore';
import {CONTAINER_ID} from './api/container';
import AppContainer from './components/AppContainer';

/**
 *	A DOM node containing the application.
 */
let container = null;

/**
 *	Renders the panel.
 */
const start = () => {
	if (container) {
		container.style.display = '';
		return true;
	}

	return getStore().then((store) => {
		container = document.createElement('div');
		container.className = CONTAINER_ID;
		document.body.appendChild(container);

		createRoot(container).render(
			<Provider store={store}>
				<IntlProvider locale="fr" messages={messages}>
					<AppContainer />
				</IntlProvider>
			</Provider>
		);
	}, noop);
};

/**
 *	Removes the panel from the page.
 */
const hide = () => {
	if (container) {
		container.style.display = 'none';
	}
};

/**
 *
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	Promise.resolve(message)
		// eslint-disable-next-line consistent-return
		.then(({type}) => {
			// eslint-disable-next-line default-case
			switch (type) {
				case OPEN_PANEL:
					return start();

				case CLOSE_PANEL:
					return hide();
			}
		})
		.then(() => sendResponse({message: 'ok'}));

	// Returning true states that sendResponse is asynchronous
	return true;
});
