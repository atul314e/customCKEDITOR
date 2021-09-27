/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description useStickyState
 */

import { useEffect, useState } from 'react';
import _ from 'lodash';

/**
 * useStickyState
 *
 * @param {any} defaultValue defaultValue
 * @param {string} key key
 * @param {any} polyfill polyfill
 * @returns {any} useStickyState
 */
const useStickyState = (defaultValue: any, key: string, polyfill?: any): [any, React.Dispatch<any>] => {
	const [value, setValue] = useState(() => {
		const stickyValue = window.localStorage.getItem(key);
		let val = stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
		if (_.isFunction(polyfill)) {
			val = polyfill(val);
		}
		return val;
	});

	useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);
	return [value, setValue];
};

export default useStickyState;
