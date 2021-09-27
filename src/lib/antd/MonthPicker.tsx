/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description MonthPicker
 */
import React from 'react';
import _ from 'lodash';
import moment, { Moment } from 'moment';
import { DatePicker } from 'antd';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';

interface IProps {
	disableFuture?: boolean;
	disablePast?: boolean;
	min?: Moment;
	max?: Moment;
}

/**
 * MonthPicker
 *
 * @param {IProps & PickerProps<Moment>} props props
 * @returns {React.FC} MonthPicker
 */
const MonthPicker: React.FC<IProps & PickerProps<Moment>> = (props) => {
	/**
	 * handle disable date
	 *
	 * @param {Moment} date date
	 * @returns {boolean} handleDisableDate
	 */
	const handleDisableDate = (date: Moment) => {
		const { disableFuture, disablePast, min, max } = props;
		if (disableFuture && date.startOf('month') > moment().startOf('month')) {
			return true;
		}

		if (disablePast && date.startOf('month') < moment().startOf('month')) {
			return true;
		}

		if (min && date.startOf('month') < min.startOf('month')) {
			return true;
		}

		if (max && date.startOf('month') > max.startOf('month')) {
			return true;
		}

		return false;
	};
	const restProps = _.omit(props, ['disableFuture', 'disablePast', 'picker']);
	return <DatePicker picker={'month'} disabledDate={handleDisableDate} {...restProps} />;
};

MonthPicker.defaultProps = {
	disableFuture: false,
	disablePast: false,
};

export default MonthPicker;
