/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description Person Icon
 */

import React from 'react';

interface IPersonProps {
	style?: React.CSSProperties;
	fill?: string;
	width?: React.CSSProperties['width'];
}

/**
 * Person Icon
 *
 * @param {IPersonProps} props props
 * @param {React.CSSProperties} props.style style
 * @param {React.CSSProperties} props.width width
 * @param {string} props.fill fill
 * @returns {React.FC} Person
 */
const Person: React.FC<IPersonProps> = ({ style, fill, width = '18px' }) => {
	return (
		<div className={'icon-contact'} style={style}>
			<svg
				style={{ width }}
				xmlns='http://www.w3.org/2000/svg'
				x='0'
				y='0'
				version='1.1'
				viewBox='0 0 512 512'
				xmlSpace='preserve'
			>
				<g fill={fill}>
					<path d='M194.3 265L39.9 340.3c-32 20.9-48 65.4-35.8 99.3l6.3 17.4 197.8.4L194.3 265zM317.6 265L472 340.3c32 20.9 48 65.4 35.8 99.3l-6.3 17.4-197.8.4L317.6 265z'></path>
					<path d='M271.7 262.2L271.7 469.8 255.7 485.8 239.7 469.8 239.7 262.2z'></path>
				</g>
				<path
					fill={fill}
					d='M258.4 228c62.6 0 113.8-51.2 113.8-113.8S321 .4 258.4.4 144.6 51.6 144.6 114.2 195.8 228 258.4 228z'
				></path>
			</svg>
		</div>
	);
};

Person.defaultProps = {
	style: { padding: '4px 4px 0 4px', borderRadius: '4px' },
	fill: '#fff',
};

export default Person;
