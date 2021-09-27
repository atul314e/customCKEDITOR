/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description Email Renderer component
 */

import React from 'react';
import { useValues } from 'kea';
import _ from 'lodash';

import UserLogic from 'logics/UserLogic';
import EventEmitter from 'utils/EventEmitter';

/**
 * EmailRenderer
 *
 * @param {Record<'email' | 'role', string>} props props
 * @param {string} props.email email
 * @param {string} props.role role
 * @returns {React.FC} EmailRenderer
 */
const EmailRenderer: React.FC<Record<'email' | 'role', string>> = ({ email, role }) => {
	const state = useValues(UserLogic);

	return _.get(state, role, false) ? (
		<a
			onClick={() =>
				EventEmitter.emit(['email', 'send-email'], {
					toEmail: email,
				})
			}
		>
			{email}
		</a>
	) : (
		<span> {email}</span>
	);
};

export default EmailRenderer;
