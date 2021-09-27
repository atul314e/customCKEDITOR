/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description Internationalization formatting
 * Inspired by https://github.com/alibaba/react-intl-universal/blob/master/src/ReactIntlUniversal.js
 */

import _ from 'lodash';
import log from 'loglevel';
interface IReactIntlOptions {
	currentLocale: string;
	currency: string;
}

interface IIntlOptions {
	localeMatcher?: 'best fit' | 'lookup';
	style?: 'decimal' | 'currency' | 'percent' | 'unit';
	unit?: string;
	unitDisplay?: 'short' | 'long' | 'narrow';
	currency?: string;
	currencyDisplay?: 'symbol' | 'code' | 'name';
	useGrouping?: boolean;
	minimumIntegerDigits?: number;
	minimumFractionDigits?: number;
	maximumFractionDigits?: number;
	minimumSignificantDigits?: number;
	maximumSignificantDigits?: number;
	notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
	compactDisplay?: 'short' | 'long' | 'narrow';
}

class ReactIntl {
	currentLocale: string;
	currency: string;
	constructor() {
		this.currentLocale = 'en-US';
		this.currency = 'USD';
	}

	init = (options: IReactIntlOptions = { currentLocale: 'en-US', currency: 'USD' }) => {
		this.currentLocale = options.currentLocale;
		this.currency = options.currency;
	};

	getFormattedNumber = (variable: number | string, options: IIntlOptions): string => {
		if (_.isNull(variable) || _.isNaN(_.toNumber(variable))) {
			return _.toString(variable) || 'NA';
		} else {
			try {
				return Intl.NumberFormat(this.currentLocale, options).format(_.toNumber(variable));
			} catch (ex) {
				log.error(`intl '${variable}' number format Failed`, ex);
				return _.toString(variable) || 'NA';
			}
		}
	};

	getNumber = (variable: number | string, maxPrecision?: number, minPrecision?: number): string => {
		return this.getFormattedNumber(variable, {
			style: 'decimal',
			maximumFractionDigits: maxPrecision || 0,
			minimumFractionDigits: minPrecision || 0,
		});
	};

	getPercent = (variable: number | string, maxPrecision?: number, minPrecision?: number): string => {
		return this.getFormattedNumber(variable, {
			style: 'percent',
			maximumFractionDigits: maxPrecision || 0,
			minimumFractionDigits: minPrecision || 0,
		});
	};

	/**
	 * Function to get currency symbol with formatted number
	 *
	 * @param {number|string} variable - A variable value to convert into currency
	 * @param {number=} maxPrecision - Maximum number of digits after decimal point
	 * @param {number=} minPrecision - Minimum number of digits after decimal point
	 * @example
	 * // returns $200
	 * intl.getCurrency(200);
	 * @example with max precision 2
	 * // returns $200.46
	 * intl.getCurrency(200.4668, 2)
	 * @returns {string} currency with symbol
	 */
	getCurrency = (variable: number | string, maxPrecision?: number, minPrecision?: number): string => {
		return this.getFormattedNumber(variable, {
			style: 'currency',
			currency: this.currency,
			maximumFractionDigits: maxPrecision,
			minimumFractionDigits: minPrecision,
		});
	};

	/**
	 * Function to get currency symbol
	 *
	 * @example $
	 * @returns {string} currency symbol
	 */
	getCurrencySymbol = () => {
		return this.getCurrency(0).replace(/[\d.]/g, '').trim();
	};
}

const intl = new ReactIntl();
export default intl;
