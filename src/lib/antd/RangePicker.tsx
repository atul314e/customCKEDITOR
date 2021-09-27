/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description Range Picker
 */

import React from 'react';
import { DatePicker } from 'antd';
import { LoadingOutlined, CalendarOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { RangePickerProps } from 'antd/lib/date-picker/index';
import moment, { Moment } from 'moment';

import { DATE_RANGE_PICKER_DATE_FORMAT } from 'constants/index';
import AppLogic from 'logics/AppLogic';

/**
 * Range Picker
 *
 * @param {RangePickerProps} props
 */
class RangePicker extends React.PureComponent<IRangePickerProps, IRangePickerStates> {
	constructor(props: IRangePickerProps) {
		super(props);
		this.state = {
			value: [null, null],
			ranges: this.generateRanges(),
		};
	}

	/**
	 * Default props for the component
	 */
	static defaultProps = {
		separator: '-',
		format: DATE_RANGE_PICKER_DATE_FORMAT,
		inputReadOnly: true,
		showToday: false,
	};

	componentDidMount() {
		const { value } = this.props;
		this.setState({
			value: this.getMomentObjects(value),
		});
	}

	componentDidUpdate(prevProps: IRangePickerProps) {
		const val = this.props.value;
		if (val !== prevProps.value) {
			this.setState({
				value: this.getMomentObjects(val),
			});
		}
	}

	/**
	 * Ref object to Date RangePicker
	 */
	rangePickerRef: React.RefObject<any> = React.createRef();

	/**
	 * Privents set of props direct contact with antd RangePicker
	 */
	omitList = ['loading', 'value', 'suffixIcon', 'onOpenChange', 'onChange', 'ranges'];

	getMomentObjects = (value: string[]): [Moment, Moment] => {
		return [moment(value[0]), moment(value[1])];
	};
	/**
	 * generates Ranges
	 *
	 * @returns {Ranges | undefined} generateRanges
	 */
	generateRanges = (): Ranges | undefined => {
		const { disableFuture, disablePast, showToday, ranges: propsRanges } = this.props;
		if (!propsRanges || _.isObject(propsRanges)) {
			return propsRanges;
		}

		const ranges = {};
		const today = moment();

		if (showToday) {
			_.setWith(ranges, 'Today', [today, today], Object);
		}

		if (!disablePast) {
			const currentMonthStarts = disablePast ? today : moment().startOf('month');
			const currentMonthEnd = disableFuture ? today : moment().endOf('month');
			_.setWith(ranges, 'Month to date', [currentMonthStarts, currentMonthEnd], Object);

			const lastMonthStart = moment().subtract(1, 'month').startOf('month');
			const lastMonthEnds = moment().subtract(1, 'month').endOf('month');
			_.setWith(ranges, 'Last Month', [lastMonthStart, lastMonthEnds], Object);

			const quarterStarts = moment().startOf('quarter');
			const quarterEnds = today;
			_.setWith(ranges, 'Quarter to date', [quarterStarts, quarterEnds], Object);

			const lastQuarter = moment().quarter() - 1;
			const lastQuarterStarts = moment().quarter(lastQuarter).startOf('quarter');
			const lastQuarterEnds = moment().quarter(lastQuarter).endOf('quarter');
			_.setWith(ranges, 'Last Quarter', [lastQuarterStarts, lastQuarterEnds], Object);

			const yearStarts = moment().startOf('year');
			_.setWith(ranges, 'Year to date', [yearStarts, today], Object);

			const lastYearStarts = moment().subtract(1, 'year').startOf('year');
			const lastYearEnds = moment().subtract(1, 'year').endOf('year');
			_.setWith(ranges, 'Last Year', [lastYearStarts, lastYearEnds], Object);
		}

		return ranges;
	};

	/**
	 * handles picker popup change
	 *
	 * @param {boolean} open open
	 */
	handleOpenChange = (open: boolean): void => {
		const { onOpenChange } = this.props;
		if (typeof onOpenChange === 'function') {
			onOpenChange(open);
		}

		if (!open) {
			this.rangePickerRef.current.blur();
			const { value } = this.props;
			this.setState({ value: this.getMomentObjects(value) });
		}
	};

	/**
	 * handler for dateRange change
	 *
	 * @param {RangeValue<Moment>} value value
	 * @param {[string, string]} formatString formatString
	 */
	handleChange = (value: RangeValue<Moment>, formatString: [string, string]): void => {
		this.setState({ value });
		const { onChange } = this.props;
		if (typeof onChange === 'function' && value) {
			const dateRange = _.map(value, (date) => {
				return date ? date.toISOString() : null;
			});
			onChange(dateRange, formatString);
		}
	};

	/**
	 * Disable Dates
	 *
	 * @param {Moment} current current
	 * @returns {boolean} disabledDate
	 */
	disabledDate = (current: Moment): boolean => {
		const { disableFuture, disablePast } = this.props;

		const defaultMin = moment().set('year', _.get(this.props, 'setting.ui_settings.base_year')).startOf('year');

		const minDate = _.get(this.props, 'min', defaultMin);
		if (disablePast) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			return current && current < moment().startOf('day');
		}

		if (disableFuture) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			return current.isBefore(minDate, 'day') || (current && current > moment().endOf('day'));
		}

		return current.isBefore(minDate, 'day');
	};

	/**
	 * Renders Range picker
	 *
	 * @returns {JSX.Element} render
	 */
	render(): JSX.Element {
		const { value, ranges } = this.state;
		const { loading, suffixIcon: propsSuffixIcon } = this.props;
		const restProps = _.omit(this.props, this.omitList) as RangePickerProps;
		const suffixIcon = propsSuffixIcon || loading ? <LoadingOutlined spin /> : <CalendarOutlined />;

		return (
			<DatePicker.RangePicker
				ref={this.rangePickerRef}
				value={value}
				suffixIcon={suffixIcon}
				onChange={this.handleChange}
				onOpenChange={this.handleOpenChange}
				disabledDate={this.disabledDate}
				ranges={ranges}
				{...restProps}
			/>
		);
	}
}

export default AppLogic(RangePicker);
