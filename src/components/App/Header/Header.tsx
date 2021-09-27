/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description Header component
 */

import React from 'react';
import _ from 'lodash';
import { Layout, Space } from 'antd';

/**
 * Logo
 */
const logo = require('assets/314eLogo.svg').default;

/**
 * class component for Header
 *
 * @class Header
 */
const Header: React.FC = () => {
	return (
		<Layout.Header>
			<Space size={18}>
				<a href={window.location.origin}>
					<img height={36} src={logo} alt='314e-Logo' />
				</a>
			</Space>
		</Layout.Header>
	);
};

export default Header;
