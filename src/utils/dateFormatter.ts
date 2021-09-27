/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description dateFormatter util functions
 */

import _ from 'lodash';
import moment from 'moment';

import { DATE_RANGE_PICKER_DATE_FORMAT } from 'constants/index';

/**
 * dateFormatter
 *
 * @param {string[]} dateRange dateRange
 * @param {string} format format
 * @returns {any} dateFormatter
 */
const dateFormatter = (dateRange: string[], format: string = DATE_RANGE_PICKER_DATE_FORMAT): (string | undefined)[] => {
	return _.map(dateRange, (date: string) => {
		const momentDate = moment(date);
		return date && momentDate.isValid() ? momentDate.format(format) : undefined;
	});
};

export default dateFormatter;
