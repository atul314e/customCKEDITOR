/**
 * @author Harish.R <harish.r@314ecorp.com>
 * Keycloak HOC for consumer
 */

import React, { useState } from 'react';
import AntDDrawer, { DrawerProps as AntDDrawerProps } from 'antd/lib/drawer';
import _ from 'lodash';

import { wrap } from './utils';

interface DrawerProps extends AntDDrawerProps {
	content?: React.ReactNode;
}

interface DrawerComponentProps {
	drawer: {
		open: (config: DrawerProps) => void;
	};
}

type EventType = React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

/**
 * Keycloak Consumer
 *
 * @param {React.ComponentType<P>} WrappedComponent WrappedComponent
 * @returns {any} withDrawer
 */
const withDrawer = <P extends Record<string, any>>(WrappedComponent: React.ComponentType<P>): any => {
	const Drawer = (props: P) => {
		const [visible, setVisible] = useState(false);
		const [config, setConfig] = useState<DrawerProps>({});

		const open = (drawerConfig: DrawerProps) => {
			setVisible(true);
			setConfig(drawerConfig);
		};

		const handleClose = (e: EventType) => {
			setVisible(false);
			if (_.isFunction(config.onClose)) {
				config.onClose(e);
			}
		};

		const restProps = _.omit(config, ['onClose', 'visible']);

		return (
			<>
				<WrappedComponent drawer={{ open }} {...props} />
				<AntDDrawer visible={visible} onClose={handleClose} {...restProps}>
					{config.content}
				</AntDDrawer>
			</>
		);
	};

	return wrap(Drawer, WrappedComponent, 'Drawer');
};

export default withDrawer;
export { DrawerProps, DrawerComponentProps };
