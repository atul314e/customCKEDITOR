/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description YearPicker
 */

import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';

interface IProps {
	disableFuture?: boolean;
	disablePast?: boolean;
	min?: Moment;
	max?: Moment;
}

/**
 * YearPicker
 *
 * @param {IProps & PickerProps<Moment>} props props
 * @returns {React.FC} YearPicker
 */
const YearPicker: React.FC<IProps & PickerProps<Moment>> = (props) => {
	const handleDisableDate = (date: Moment) => {
		const { disableFuture, disablePast, min, max } = props;
		if (disableFuture && date.year() > moment().year()) {
			return true;
		}

		if (disablePast && date.year() < moment().year()) {
			return true;
		}

		if (min && date.year() < min.year()) {
			return true;
		}

		if (max && date.year() > max.year()) {
			return true;
		}

		return false;
	};

	const restProps = _.omit(props, ['disableFuture', 'disablePast', 'picker']);
	return <DatePicker picker={'year'} disabledDate={handleDisableDate} {...restProps} />;
};
YearPicker.defaultProps = {
	disableFuture: false,
	disablePast: false,
};

export default YearPicker;
