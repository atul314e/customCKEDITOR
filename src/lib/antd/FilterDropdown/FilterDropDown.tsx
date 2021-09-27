/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description Custom search component for column filters
 */

import React from 'react';
import _ from 'lodash';
import { Input, Button, List, Checkbox } from 'antd';
import { FilterDropdownProps } from 'antd/lib/table/interface';

import './FilterDropdownStyle.css';

/**
 *
 * getFilteredKeys returns array of strings by removing the
 *
 * @param {string[]} selectedKeys selectedKeys
 * @param {string} filterUpOn filterUpOn
 * @returns {string[]} getFilteredKeys
 */
const getFilteredKeys = (selectedKeys: string[], filterUpOn: string): string[] => {
	return _.filter(selectedKeys, (selectedKey) => {
		return selectedKey !== filterUpOn;
	});
};

/**
 * Functional component to get custom search in column filters
 *
 * @param {string[]} filters - A list of filter names
 * @param {string} dataIndex - A key in row data to perform filter
 * @param {string} columnName - A column name to display in input placeholder
 * @param {string[]} defaultFilters defaultFilters
 * @returns {{filterDropDown:React.ReactNode, onFilter:(value:any, record:any) => boolean}} getFilterDropDown
 */
const getFilterDropDown = (
	filters: string[],
	dataIndex: string,
	columnName: string,
	defaultFilters: string[] = [],
): any => {
	// dupFilters is useful to filter values based on the search input
	let dupFilters = filters;
	const inputRef = React.createRef<Input>();
	let isSelected = false;

	if (_.isEmpty(defaultFilters) || (!_.isEmpty(defaultFilters) && defaultFilters.length === filters.length)) {
		isSelected = true;
	}

	return {
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => {
			let selectedKeyCopy = selectedKeys as string[];

			if (selectedKeys && clearFilters && setSelectedKeys && confirm) {
				selectedKeyCopy = isSelected ? filters : _.isEmpty(selectedKeyCopy) ? defaultFilters : selectedKeyCopy;

				if (!_.isEmpty(selectedKeys)) {
					isSelected = selectedKeys.length === filters.length;
					selectedKeyCopy = selectedKeys as string[];
				}

				/**
				 * function to execute on click of the select all checkbox
				 */
				const handleSelectAllClick = () => {
					if (isSelected) {
						isSelected = false;
						setSelectedKeys([]);
					} else {
						isSelected = true;
						setSelectedKeys([...filters]);
					}
				};

				/**
				 * function to execute on click of the checkbox
				 *
				 * @description if the item given is included in the selectedKeyCopy it removes else adds
				 * @param {string} item - to remove or to add selectedKeyCopy
				 * @returns {void} handleCheckBoxClick
				 */
				const handleCheckBoxClick = (item: string) => {
					if (_.includes(selectedKeyCopy, item)) {
						isSelected = false;
						setSelectedKeys(getFilteredKeys(selectedKeyCopy, item));
					} else {
						if (_.includes(selectedKeyCopy, 'this-is-to-show-empty-table')) {
							selectedKeyCopy = getFilteredKeys(selectedKeyCopy, 'this-is-to-show-empty-table');
						}
						if (selectedKeyCopy.length === filters.length - 1) {
							isSelected = true;
						}
						setSelectedKeys([...selectedKeyCopy, item]);
					}
				};

				/**
				 * function to render the list item
				 *
				 * @param {string} item - value for the list item
				 * @returns {JSX.Element | undefined} list item with the given value
				 */
				const renderListItem = (item: string) => {
					if (!_.isEmpty(item) || _.isNumber(item)) {
						return (
							<List.Item>
								<Checkbox
									checked={_.includes(selectedKeyCopy, item)}
									onClick={() => handleCheckBoxClick(item)}
								>
									{item}
								</Checkbox>
							</List.Item>
						);
					}
				};

				/**
				 * function to execute on click of the reset button.
				 *
				 * @description calls the function clearFilters and set the isSelected flag to true
				 * @param {React.MouseEvent<HTMLElement, MouseEvent>} e -
				 * need to reset the input field if any value exist in it
				 */
				const handleResetButtonClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
					if (inputRef.current !== null) {
						inputRef.current.handleReset(e);
					}
					isSelected = true;

					clearFilters();
				};

				/**
				 * function to execute on click of the ok button
				 *
				 * @description calls the confirm function if selectedKeyCopy is not empty else
				 * calls the setSelectedKeys with dummy value to show empty table
				 * @param {React.MouseEvent<HTMLElement, MouseEvent>} e -
				 * need to reset the input field if any value exist in it
				 */
				const handleOkButtonClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
					if (inputRef.current !== null) {
						inputRef.current.handleReset(e);
					}
					if (_.isEmpty(selectedKeyCopy)) {
						setSelectedKeys(['this-is-to-show-empty-table']);
					}
					confirm({ closeDropdown: true });
				};

				/**
				 * function to execute on change of the input.
				 *
				 * @description based on the given input it shows the options that match to
				 * the input
				 * @param {React.ChangeEvent<HTMLInputElement>} e - change event
				 */
				const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
					dupFilters = _.filter(filters, (filter) =>
						_.includes(_.toLower(filter), _.toLower(e.target.value)),
					);
					setSelectedKeys([...selectedKeyCopy]);
				};

				return (
					<div className='filterWrapper'>
						<Input ref={inputRef} placeholder={`Search by ${columnName}`} onChange={handleOnInputChange} />
						<div className='filterListWrapper'>
							<div className='selectCheckBox'>
								<Checkbox checked={isSelected} onClick={handleSelectAllClick}>
									{'Select All'}
								</Checkbox>
							</div>
							<List dataSource={dupFilters} renderItem={renderListItem} />
						</div>
						<div className='filterFooter'>
							<div>
								<Button
									disabled={isSelected}
									size='small'
									type='primary'
									onClick={handleResetButtonClick}
								>
									Reset
								</Button>
							</div>
							<div>
								<Button type='primary' size='small' onClick={handleOkButtonClick}>
									OK
								</Button>
							</div>
						</div>
					</div>
				);
			}
		},
		onFilter: (value: any, record: any) => {
			const val = _.get(record, dataIndex);
			if (value === '(Blanks)') {
				return _.isNil(val) || (!_.isNumber(val) && _.isEmpty(val));
			}
			return _.isArray(val) ? _.includes(val, value) : val === value;
		},
	};
};

export default getFilterDropDown;
