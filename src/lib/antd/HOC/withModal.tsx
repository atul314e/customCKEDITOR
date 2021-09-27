/**
 * Modal HOC
 * @author Harish.R <harish.r@314ecorp.com>
 */

import React, { useState } from 'react';
import AntDModal, { ModalProps as AntDModalProps } from 'antd/lib/modal/Modal';
import _ from 'lodash';

import { wrap } from './utils';

interface ModalProps extends AntDModalProps {
	content?: React.ReactNode;
}

interface ModalComponentProps {
	modal: {
		open: (config: ModalProps) => void;
	};
}

/**
 * Keycloak Consumer
 *
 * @param {React.ComponentType<P>} WrappedComponent WrappedComponent
 * @returns {any} withModal
 */
const withModal = <P extends Record<string, any>>(WrappedComponent: React.ComponentType<P>): any => {
	const Modal = (props: P) => {
		const [visible, setVisible] = useState(false);
		const [config, setConfig] = useState<ModalProps>({});

		const open = (modalConfig: ModalProps) => {
			setVisible(true);
			setConfig(modalConfig);
		};

		const handleOk = (e: React.MouseEvent<HTMLElement>) => {
			setVisible(false);
			if (_.isFunction(config.onOk)) {
				config.onOk(e);
			}
		};

		const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
			setVisible(false);
			if (_.isFunction(config.onCancel)) {
				config.onCancel(e);
			}
		};

		const restProps = _.omit(config, ['onOk', 'onCancel', 'visible']);

		return (
			<>
				<WrappedComponent modal={{ open }} {...props} />
				<AntDModal visible={visible} onOk={handleOk} onCancel={handleCancel} {...restProps}>
					{config.content}
				</AntDModal>
			</>
		);
	};

	return wrap(Modal, WrappedComponent, 'Modal');
};

export default withModal;
export { ModalProps, ModalComponentProps };
