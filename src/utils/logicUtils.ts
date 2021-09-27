/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description Logic Utils
 */

import _ from 'lodash';

/**
 * gets the specified value using key
 *
 * @param {string} key key
 * @param {T} defaults defaults
 * @returns {T} get state value
 */
const get =
	<T>(key: string, defaults?: T) =>
	(state: T, payload: Record<string, T>): T => {
		return _.get(payload, key, !_.isUndefined(defaults) ? defaults : state);
	};

/**
 * Returns default value
 *
 * @param {Record<string, any>} cache cache
 * @param {string} key key
 * @returns {T} getDefault
 */
const getDefault =
	<T>(cache: Record<string, any>, key: string) =>
	(): T => {
		return _.get(cache, ['localStorageDefaults', key]);
	};

/**
 * creates an object from specified keys
 *
 * @param {K[]} keys keys
 * @returns {any[]} pick
 */
const pick =
	<T, K extends keyof T>(keys: K[]) =>
	(__: T, payload: { [k in K]: T[k] }): { [k in K]: T[k] } => {
		return _.pick(payload, keys);
	};
export { get, pick, getDefault };

const getOrder = (sorter: Record<string, any>) => {
	const columnKey = _.get(sorter, 'columnKey', sorter.field);
	const field = _.isArray(columnKey) ? _.first(columnKey) : columnKey;
	return [{ [field]: sorter.order === 'ascend' ? 'asc' : 'desc' }];
};

/**
 * setFilterAndSortAction
 *
 * @param {any} pagination pagination
 * @param {any} filters filters
 * @param {any} sorter sorter
 * @returns {Record<string, any>} setFilterAndSortAction
 */
export const setFilterAndSortAction = (pagination: any, filters: any, sorter: any): Record<string, any> => {
	return {
		filters,
		sorter: _.pick(sorter, ['order', 'field']),
		offset: _.multiply(pagination.current, pagination.pageSize) - pagination.pageSize,
		order: _.get(sorter, 'order') ? getOrder(sorter) : undefined,
	};
};
