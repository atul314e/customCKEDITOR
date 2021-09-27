/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description antd types
 */

declare type Moment = import('antd/node_modules/moment/ts3.1-typings/moment').Moment;
declare type RangeValue<DateType> = import('rc-picker/lib/interface').RangeValue<DateType>;
declare type EventValue<DateType> = import('rc-picker/lib/interface').EventValue<DateType>;

type RangesType = [EventValue<Moment>, EventValue<Moment>];
declare type Ranges = Record<string, RangesType | (() => RangesType)>;

/**
 * Range Picker
 */
interface IRangePickerExtraProps {
	loading?: boolean;
	disableFuture?: boolean;
	disablePast?: boolean;
	showToday?: boolean;
	ranges?: true | Ranges;
	min?: Moment;
}

declare type IRangePickerProps = IRangePickerExtraProps & Omit<RangePickerProps, 'ranges'>;

declare interface IRangePickerStates {
	value?: RangeValue<Moment>;
	ranges?: Ranges;
}

/**
 * Table
 */
interface ErrorResult {
	title: string;
	subTitle: string;
}

declare interface ITableExtraProps {
	error?: boolean | ErrorResult;
	extra?: any;
	tableTitle?: any;
}
declare interface IPaginationTableExtraProps {
	error?: boolean | ErrorResult;
	offset: number;
	total: number;
	onChange: any;
}

declare type ITableProps = import('antd/lib/table/Table').TableProps<any> & ITableExtraProps;
declare type IPaginationTableProps = import('antd/lib/table/Table').TableProps<any> & IPaginationTableExtraProps;

declare interface ITableStates {
	dataSource: readonly any[] | undefined;
	pagination?: false | import('antd/lib/table/Table').TablePaginationConfig;
	scrollY?: string | number;
}

declare interface IBreadcrumb {
	key: string;
	title: string;
	onClick?: (...restProps: any) => void;
}

declare interface IDropdownProps {
	loading?: boolean;
	breadcrumb?: IBreadcrumb[];
	extra?: React.Element;
}

declare interface IPriorityTags {
	value: string;
	color?: string;
	colors?: Record<string, string>;
	defaultColor?: string;
}
