/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description Boolean tag
 */

import React from 'react';
import { Tag } from 'antd';
import _ from 'lodash';

/**
 * Priority Tag
 *
 * @param {IPriorityTags} props props
 * @param {string | undefined} props.defaultColor defaultColor
 * @param {any} props.color color
 * @param {any} props.colors colors
 * @param {any} props.value value
 * @returns {React.FC} PriorityTag
 */
const PriorityTag: React.FC<IPriorityTags> = ({ defaultColor, color, colors, value }) => {
	const tagColor = color || _.get(colors, _.toLower(value), defaultColor);
	return <Tag color={tagColor}>{value}</Tag>;
};

PriorityTag.defaultProps = {
	colors: {
		low: 'green',
		medium: 'orange',
		high: 'red',
	},

	defaultColor: 'blue',
};

export default PriorityTag;
