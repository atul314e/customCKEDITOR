/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description date renderer for the antd Table
 */

import moment from 'moment';

import { DATE_AND_TIME_FORMAT, DATE_RANGE_PICKER_DATE_FORMAT } from 'constants/index';

interface IDefaultOptions {
	showTime?: boolean;
	format?: string;
	defaultValue?: string | null;
}

/**
 * Default options for the format
 */
const defaultsOptions: IDefaultOptions = {
	showTime: true,
	format: undefined,
	defaultValue: null,
};

/**
 * Formatter
 *
 * @param {defaultsOptions} options options
 * @returns {string} dateRenderer
 */
const dateRenderer =
	(options = defaultsOptions) =>
	(value: string): string | undefined | null => {
		const format = options.format;
		const showTime = options.showTime || defaultsOptions.showTime;
		const defaultValue = options.defaultValue || defaultsOptions.defaultValue;
		const displyFormat = format || showTime ? DATE_AND_TIME_FORMAT : DATE_RANGE_PICKER_DATE_FORMAT;
		if (value) {
			const formattedDate = moment(value);
			return formattedDate.isValid() ? formattedDate.format(displyFormat) : defaultValue;
		} else {
			return defaultValue;
		}
	};

export default dateRenderer;
