/**
 * User logic
 * @author Harish.R <harish.r@314ecorp.com>
 */

import { kea } from 'kea';
import _ from 'lodash';
import { get } from 'utils/logicUtils';

/**
 * Kea logic for App
 */
const logic = kea<IUser>({
	path: ['user'],

	defaults: {
		id: '',
		email: '',
		name: 'Guest',
		realmRoles: [],
	},

	actions: {
		updateUser: (user: IUser) => user,
	},

	reducers: () => {
		return {
			// User
			id: { updateUser: get<string>('id') },
			email: { updateUser: (state, payload) => _.toLower(_.get(payload, 'email', state)) },
			name: { updateUser: get<string>('name') },
			realmRoles: { updateUser: get<string[]>('realmRoles') },
		};
	},
	selectors: {},
});

export default logic;
