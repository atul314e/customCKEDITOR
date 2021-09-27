/**
 * Kea redux store
 * @author Harish.R <harish.r@314ecorp.com>
 */

import { resetContext, getContext } from 'kea';
import localStoragePlugin from 'kea-localstorage';

resetContext({
	createStore: {},
	plugins: [
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		localStoragePlugin({
			// in case you want to replace this, e.g. for tests or non browser environments
			storageEngine: window.sessionStorage,
			// added before all paths in localStorage keys
			prefix: 'logic',
			// to change the symbol that concats path parts
			separator: '_',
		}),
	],
});

export default getContext().store;
