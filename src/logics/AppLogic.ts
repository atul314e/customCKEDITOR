/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description Kea Logic for app
 */

import _ from 'lodash';
import { kea } from 'kea';
import { get } from 'utils/logicUtils';

/**
 * Kea logic for app
 */
const logic = kea({
	path: ['app'],

	defaults: {
		loading: true,
		error: false,
		basePath: null,
	},

	actions: {
		syncAppData: (basePath: string) => ({ basePath }),
		setError: true,
		clearError: true,
	},

	listeners: () => ({
		syncAppData: async () => {},
	}),

	reducers: {
		loading: {
			syncAppData: _.stubFalse,
		},
		error: {
			setError: _.stubTrue,
			clearError: _.stubFalse,
		},
		basePath: {
			syncAppData: get<string>('basePath'),
		},
	},
});

export default logic;
