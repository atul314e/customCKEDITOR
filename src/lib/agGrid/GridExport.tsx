/**
 * UI Component provides different options for Data export
 *
 * @author Harish.R <harish.r@314ecorp.com>
 */

import React from 'react';
import _ from 'lodash';
import { Button, Dropdown, Menu, Spin } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/lib/interface';

import { getExportHeader } from './exportHelper';

/**
 * interface for export params
 *
 * @interface
 */
export interface IExportParams {
	fileName: string;
	reportName: string;
	currency: string;
	gridApi: any;
	headers: string[];
	parameters: Record<string, any>[];
}

/**
 * interface for export params
 *
 * @interface
 */
interface IProps {
	getReportParameters: () => IExportParams;
	disabled?: boolean;
}

/**
 * GridExport
 *
 * @param {IProps} props props
 * @returns {React.FC} GridExport
 */
const GridExport: React.FC<IProps> = (props) => {
	const [loading, setLoading] = React.useState(false);
	const handleExport = (params: MenuInfo) => {
		setLoading(true);
		const reportParameters: IExportParams = props.getReportParameters();
		if (params.key === 'excel') {
			if (!_.isEmpty(reportParameters.gridApi)) {
				reportParameters.gridApi.exportDataAsExcel({
					allColumns: true,
					skipHeader: true,
					fileName: reportParameters.fileName,
					sheetName: reportParameters.reportName,
					customHeader: getExportHeader(reportParameters),
					suppressTextAsCDATA: true,
					exportMode: 'xlsx',
				});
			}
		} else if (params.key === 'csv') {
			const exportParams = {
				allColumns: true,
				skipHeader: true,
				fileName: reportParameters.fileName,
				sheetName: reportParameters.reportName,
				customHeader: _.join(
					_.map(reportParameters.headers, (item: string) => {
						return _.includes(item, ',') ? `"${item}"` : item;
					}),
					',',
				),
			};
			reportParameters.gridApi.exportDataAsCsv(exportParams);
		}
		setLoading(false);
	};

	return loading ? (
		<Spin />
	) : (
		<Dropdown
			overlay={
				<Menu onClick={handleExport}>
					<Menu.Item key='excel'>Export As Excel</Menu.Item>
					<Menu.Item key='csv'>Export As CSV</Menu.Item>
				</Menu>
			}
			disabled={props.disabled}
		>
			<Button icon={<FileExcelOutlined />} className={'ant-btn-icon'} />
		</Dropdown>
	);
};

export default GridExport;
