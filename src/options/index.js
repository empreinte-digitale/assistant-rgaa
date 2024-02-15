import React from 'react';
import {createRoot} from 'react-dom/client';
import {IntlProvider} from 'react-intl';
import messages from '../common/messages/fr';
import App from './components/App';

const init = () => {
	const root = createRoot(document.getElementById('options'));
	const app = (
		<IntlProvider locale="fr" messages={messages}>
			<App />
		</IntlProvider>
	);

	root.render(app);
};

init();
