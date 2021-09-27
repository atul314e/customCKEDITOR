/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description Boolean tag
 */

import React from 'react';
import { Tag } from 'antd';
import _ from 'lodash';

/**
 * Boolean Tag
 *
 * @param {Record<'value', string>} props props
 * @param {string} props.value value
 * @returns {React.FC} BooleanTag
 */
const BooleanTag: React.FC<Record<'value', string>> = ({ value }) => {
	if ((_.isBoolean(value) && value === true) || _.toLower(value) === 'yes') {
		return <Tag color='green'>Yes</Tag>;
	}
	return <Tag color='red'>No</Tag>;
};

export default BooleanTag;
