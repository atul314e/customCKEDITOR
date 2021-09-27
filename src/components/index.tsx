/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description container for app
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import App from 'components/App';
import registerSW from '../service-worker-registration';
import store from 'store/index';
import { createBrowserHistory } from 'history';

const SecureApp = App;

ReactDOM.render(
	<Router history={createBrowserHistory()}>
		<Provider store={store}>
			<SecureApp />
		</Provider>
	</Router>,
	document.getElementById('root'),
);

if ((module as any).hot) {
	(module as any).hot.accept('./index', () => {
		const NextApp = require('./index').default;
		ReactDOM.render(<NextApp />, document.getElementById('root'));
	});
}

// register service worker to cache assets using workbox
registerSW();
