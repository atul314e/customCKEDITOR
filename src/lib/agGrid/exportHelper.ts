/**
 * Aggrid Configs helps for export data as xlsx. It follows OpenXML CellFormat and SpreadsheetML
 *
 * @author Harish.R <harish.r@314ecorp.com>
 */

import _ from 'lodash';
import moment from 'moment';
import { ICellRendererParams } from '@ag-grid-community/core';

import { IExportParams } from './GridExport';
import intl from 'utils/intl';

/**
 * get cellrender params
 *
 * @param {ICellRendererParams} params params
 * @returns {any} getCellRendererParams
 */
const getCellRendererParams = (params: ICellRendererParams) => {
	const cellRendererParams = _.get(params, 'colDef.cellRendererParams');
	if (_.isFunction(cellRendererParams)) {
		return params.colDef.cellRendererParams(params);
	} else if (_.isObject(cellRendererParams)) {
		return params.colDef.cellRendererParams;
	}
};

/**
 * styles for cells in excel export
 */
const excelStyles = [
	{
		id: 'headerCell',
		font: {
			bold: true,
			color: '#ffffff',
		},
		interior: {
			color: '#4c98d8',
			pattern: 'Solid',
		},
		alignment: {
			wrapText: true,
		},
		borders: {
			borderBottom: {
				color: '#ffffff',
				lineStyle: 'Continuous',
				weight: 1,
			},
			borderLeft: {
				color: '#ffffff',
				lineStyle: 'Continuous',
				weight: 1,
			},
			borderRight: {
				color: '#ffffff',
				lineStyle: 'Continuous',
				weight: 1,
			},
			borderTop: {
				color: '#ffffff',
				lineStyle: 'Continuous',
				weight: 1,
			},
		},
	},
	{
		id: 'blueFont',
		font: {
			bold: true,
			color: '#4c98d8',
		},
	},
	{
		id: 'negetiveFont',
		font: {
			color: '#c51f2b',
		},
	},
	{
		id: 'numberCell',
		numberFormat: { format: '#,###' },
	},
	{
		id: 'percentageCell',
		numberFormat: { format: '#,###%' },
	},
	{
		id: 'currencyCell',
		numberFormat: { format: `${intl.getCurrencySymbol()}#,###` },
	},
];

/**
 * colmn definition for exporter
 */
const defaultColDef = {
	cellClassRules: {
		currencyCell: (params: ICellRendererParams): boolean => {
			if (_.isNaN(_.toNumber(params.value))) {
				return false;
			}
			const cellRendererParams = getCellRendererParams(params);
			return _.get(cellRendererParams, 'style') === 'currency';
		},

		percentageCell: (params: ICellRendererParams): boolean => {
			if (_.isNaN(_.toNumber(params.value))) {
				return false;
			}
			const cellRendererParams = getCellRendererParams(params);
			return _.get(cellRendererParams, 'style') === 'percent';
		},

		numberCell: (params: ICellRendererParams): boolean => {
			if (_.isNaN(_.toNumber(params.value))) {
				return false;
			}
			const style = _.get(getCellRendererParams(params), 'style');
			return _.isUndefined(style) || _.includes(['number', 'decimal'], style);
		},

		negetiveFont: (params: ICellRendererParams): boolean => {
			const number = _.toNumber(params.value);
			return !_.isNaN(number) && number < 0;
		},
	},
};

/**
 * Custom Headers configuration for Excel Export
 *
 * @param {IExportParams} reportParameters reportParameters
 * @returns {any} getExportHeader
 */
const getExportHeader = (reportParameters: IExportParams): any => {
	const styledExcelHeaders = [];

	// Row 1: Report Name
	styledExcelHeaders.push([
		{
			styleId: 'blueFont',
			data: {
				type: 'String',
				value: 'Report Name:',
			},
		},
		{
			data: {
				type: 'String',
				value: reportParameters.reportName,
			},
		},
	]);

	// Row 2: Currency
	styledExcelHeaders.push([
		{
			styleId: 'blueFont',
			data: {
				type: 'String',
				value: 'Currency:',
			},
		},
		{
			data: {
				type: 'String',
				value: reportParameters.currency,
			},
		},
	]);

	if (_.isArray(reportParameters.parameters) && !_.isEmpty(reportParameters.parameters)) {
		// Row 4: Empty row
		styledExcelHeaders.push([]);
		// Row 5: Parameters Title
		styledExcelHeaders.push([
			{
				styleId: 'blueFont',
				data: {
					type: 'String',
					value: 'Parameters:',
				},
			},
		]);

		// Row 6 onwords: Screen Parameters (max 2 parameters per row)
		let paramArray: Record<string, any>[] = [];
		_.forEach(reportParameters.parameters, (param: Record<string, any>, index: number) => {
			paramArray.push({
				styleId: 'blueFont',
				data: {
					type: 'String',
					value: _.toString(_.get(param, 'label')),
				},
			});
			paramArray.push({
				data: {
					type: 'String',
					value: _.toString(_.get(param, 'value')),
				},
			});

			// Only 2 parameter in a raw
			if (index < reportParameters.parameters.length - 1 && index % 2 === 0) {
				paramArray.push({
					data: {
						type: 'String',
						value: '',
					},
				});
			} else {
				styledExcelHeaders.push(paramArray);
				paramArray = [];
			}
		});
	}

	styledExcelHeaders.push([]);
	styledExcelHeaders.push([
		{
			data: {
				type: 'String',
				value: `Report generated on ${moment().format('MMMM Do YYYY, h:mm:ss a')}`,
			},
		},
	]);

	styledExcelHeaders.push([]);
	styledExcelHeaders.push(
		_.map(reportParameters.headers, (column: string) => ({
			styleId: 'headerCell',
			data: {
				type: 'String',
				value: column,
			},
		})),
	);

	return styledExcelHeaders;
};

export { excelStyles, defaultColDef, getExportHeader };
