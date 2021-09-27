/**
 * @author Harish.R <harish.r@314ecorp.com>
 * Format moment time
 */

import moment from 'moment';
import _ from 'lodash';

/**
 * function to calculate the time in format
 *
 * @param {number} time time
 * @returns {string} getTime
 */
export const getTime = (time: number): string => {
	const start = moment();
	const end = moment().add(time, 'seconds');
	const duration = moment.duration(end.diff(start));

	const hours = _.floor(duration.asHours()) < 10 ? `0${_.floor(duration.asHours())}` : _.floor(duration.asHours());
	const min = duration.minutes() < 10 ? `0${duration.minutes()}` : duration.minutes();
	const sec = duration.seconds() < 10 ? `0${duration.seconds()}` : duration.seconds();

	return `${hours}:${min}:${sec}`;
};

/**
 * function to check if first date is after second date
 *
 * @param {string} firstDate firstDate
 * @param {string} secondDate secondDate
 * @returns {boolean} getIsAfter
 */
export const getIsAfter = (firstDate: string, secondDate: string): boolean => {
	return moment(firstDate).isAfter(moment(secondDate));
};
