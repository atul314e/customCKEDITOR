/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description Description
 */

import _ from 'lodash';

/**
 * HOC Wrapper
 * Adds display name for the Wrapper Component
 *
 * @param {any} Component Component
 * @param {any} WrappedComponent WrappedComponent
 * @param {string} suffix suffix
 * @returns {any} wrap
 */
const wrap = (Component: any, WrappedComponent: any, suffix: string): any => {
	const name = _.get(Component, 'displayName', _.get(Component, 'name', 'Component'));
	const displayName = `with${suffix}(${name})`;
	_.setWith(Component, 'WrappedComponent', WrappedComponent, Object);
	_.setWith(Component, 'displayName', displayName, Object);
	return Component;
};

export { wrap };
