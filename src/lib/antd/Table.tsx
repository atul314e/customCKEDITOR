/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description Table widget for recruiter dashabord
 */

import React from 'react';
import _ from 'lodash';
import log from 'loglevel';
import { ClearOutlined } from '@ant-design/icons';
import { Table as AntDTable, Result, Space, Tooltip, Button } from 'antd';

import { SCROLL } from 'constants/index';

/**
 * Table widget for recruiter dashabord
 */
class Table extends React.PureComponent<ITableProps, ITableStates> {
	/**
	 * Paginations size
	 */
	paginationSize = 100;

	constructor(props: ITableProps) {
		super(props);
		this.state = {
			dataSource: [],
			pagination: props.pagination,
			scrollY: props?.scroll?.y,
		};
	}

	/**
	 * Default props for the component
	 */
	static defaultProps = {
		loading: false,
		error: false,
		dataSource: [],
		size: 'small',
		bordered: true,
		scroll: SCROLL.px148,
		pagination: false,
		showSorterTooltip: false,
	};

	/**
	 * Pagination height
	 */
	paginationHeight = '30px';

	/**
	 * Default error message
	 */
	defaultErrorMsg = {
		title: 'Oops!',
		subTitle: 'Something went wrong! Please try after sometime.',
	};

	/**
	 * Updates Pagination based on DataSource
	 */
	componentDidMount(): void {
		this.updatePagination();
	}

	/**
	 * Updates Pagination based on DataSource
	 *
	 * @param {ITableProps} prevProps prevProps
	 * @returns {void} componentDidUpdate
	 */
	componentDidUpdate(prevProps: ITableProps): void {
		this.updatePagination(prevProps);
	}

	/**
	 * Prevent Duplicates
	 *
	 * @param {ITableProps} prevProps prevProps
	 * @returns {any[] | undefined} getUniqDataSource
	 */
	getUniqDataSource = (prevProps?: ITableProps): readonly any[] | undefined => {
		const { dataSource, rowKey } = this.props;
		if (prevProps?.dataSource === dataSource) {
			return this.state.dataSource;
		}
		if (rowKey) {
			const uniqDataSource = _.uniqBy(dataSource, rowKey);

			if (_.size(uniqDataSource) !== _.size(dataSource)) {
				log.error('[Error] Duplicate Records found in the screen', window.location.href);
			}

			return uniqDataSource;
		}
		return dataSource;
	};

	/**
	 * Updates Pagination based on DataSource
	 *
	 * @param {ITableProps} prevProps prevProps
	 * @returns {void} updatePagination
	 */
	updatePagination = (prevProps?: ITableProps): void => {
		const { scroll } = this.props;
		const dataSource = this.getUniqDataSource(prevProps);
		const { pagination } = this.state;
		const totalRecords = _.size(dataSource);
		if (pagination === false && totalRecords > this.paginationSize) {
			this.setState(({ scrollY }) => ({
				dataSource,
				pagination: {
					position: ['bottomRight'],
					pageSize: 100,
					onShowSizeChange: this.handleShowSizeChange,
				},
				scrollY: `calc(${scrollY} - ${this.paginationHeight})`,
			}));
		} else if (pagination && totalRecords <= this.paginationSize) {
			this.setState({ dataSource, pagination: false, scrollY: scroll?.y });
		} else if (prevProps?.dataSource !== dataSource) {
			this.setState({ dataSource });
		}
	};

	/**
	 * sets Pagination size
	 *
	 * @param {number} __ not required
	 * @param {number} size size
	 * @returns {void} handleShowSizeChange
	 */
	handleShowSizeChange = (__: number, size: number): void => {
		this.setState(({ pagination }) => ({
			pagination: pagination === false ? pagination : { ...pagination, pageSize: size },
		}));
	};

	getTitle = (): JSX.Element => {
		return (
			<div className={'flex-box-space-between'}>
				<div>{this.props.tableTitle}</div>
				<Space>
					{this.props.extra}
					{_.isFunction(this.props?.onChange) && (
						<Tooltip title='Clear Filter/Sort'>
							<Button
								className={'ant-btn-icon'}
								shape='circle'
								onClick={() =>
									this.props?.onChange?.({}, {}, {}, { currentDataSource: [], action: 'sort' })
								}
							>
								<ClearOutlined />
							</Button>
						</Tooltip>
					)}
				</Space>
			</div>
		);
	};

	/**
	 * Renders table
	 *
	 * @returns {JSX.Element} render
	 */
	render(): JSX.Element {
		const { error } = this.props;
		if ((_.isBoolean(error) && error) || !_.isEmpty(error)) {
			const { title, subTitle } = this.defaultErrorMsg;
			return (
				<Result
					status='warning'
					title={_.get(error, 'title') || title}
					subTitle={_.get(error, 'subTitle') || subTitle}
				/>
			);
		}

		const { scrollY, pagination, dataSource } = this.state;
		const restProps = _.omit(this.props, ['pagination', 'scroll', 'dataSource', 'extra']);
		// removing x from the scroll causes flash effect in screen table headers
		// TODO - Flash effect on Table antD v4.3

		return (
			<AntDTable
				title={this.getTitle}
				dataSource={dataSource}
				scroll={{ y: scrollY }}
				pagination={pagination}
				{...restProps}
			/>
		);
	}
}

export default Table;
