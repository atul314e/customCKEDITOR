/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description PaginationTable widget for Canidates and Contacts
 */

import React from 'react';
import _ from 'lodash';
import { Button, Table as AntDTable, Result, Space, Tooltip } from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import { TableProps } from 'antd/lib/table/Table';

import intl from 'utils/intl';
import { SCROLL } from 'constants/index';

interface IProps extends Omit<TableProps<any>, 'title'> {
	defaultOrder?: any;
	extra?: React.ReactNode;
	total?: number;
	offset?: number;
	pageSize?: number;
	error: any;
	onSelectAll?: () => void;
}

/**
 * PaginationTable widget for Candidates and Contacts
 *
 * @param {IProps} props props
 * @returns {React.FC} AjaxTable
 */
const AjaxTable: React.FC<IProps> = (props) => {
	const {
		extra,
		error,
		offset = 0,
		pageSize = 100,
		scroll,
		total = 0,
		rowSelection,
		onSelectAll,
		onChange,
		...restProps
	} = props;

	if ((_.isBoolean(error) && error) || !_.isEmpty(error)) {
		return (
			<Result
				status='warning'
				title={_.get(error, 'title', 'Oops!')}
				subTitle={_.get(error, 'subTitle', 'Something went wrong! Please try after sometime.')}
			/>
		);
	}

	const pagination = {
		size: 'small' as const,
		disabled: props.loading as boolean,
		current: offset / pageSize + 1,
		pageSize,
		showSizeChanger: false,
		total,
		hideOnSinglePage: true,
	};

	const getTitle = () => {
		let left;
		if (typeof rowSelection === 'object') {
			const { selectedRowKeys } = rowSelection;
			const formattedTotal = intl.getNumber(total);
			const selectedRows = _.size(selectedRowKeys);
			const showSelectAll = total > 100 && selectedRows !== 0 && selectedRows !== total;
			const showClear = selectedRows !== 0;

			left = (
				<Space>
					<span>{`${
						_.isEmpty(selectedRowKeys)
							? `Total : ${formattedTotal}`
							: `Selected : ${intl.getNumber(selectedRows)} / ${formattedTotal} `
					} `}</span>
					{showSelectAll && (
						<Button size='small' type='link' onClick={() => onSelectAll?.()}>
							Select all
						</Button>
					)}
					{showClear && (
						<Button type='link' size='small' onClick={() => rowSelection?.onChange?.([], [])}>
							Clear
						</Button>
					)}
				</Space>
			);
		}

		return (
			<div className={'flex-box-space-between'}>
				<div>{left}</div>
				<Space>
					{extra}

					<Tooltip title='Clear Filter/Sort'>
						<Button
							className={'ant-btn-icon'}
							shape='circle'
							onClick={() => onChange?.(pagination, {}, props.defaultOrder, [] as any)}
						>
							<ClearOutlined />
						</Button>
					</Tooltip>
				</Space>
			</div>
		);
	};

	return (
		<AntDTable
			title={getTitle}
			scroll={{ y: scroll?.y }}
			pagination={pagination}
			rowSelection={rowSelection}
			onChange={onChange}
			{...restProps}
		/>
	);
};

AjaxTable.defaultProps = {
	offset: 0,
	pageSize: 100,
	loading: false,
	error: false,
	dataSource: [],
	size: 'small',
	bordered: true,
	scroll: SCROLL.px148,
	showSorterTooltip: false,
};

export default AjaxTable;
