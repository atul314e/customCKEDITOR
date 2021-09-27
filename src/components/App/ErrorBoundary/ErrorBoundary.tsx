/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description custom component to handle catch errors
 */

import React, { PureComponent } from 'react';
import _ from 'lodash';
import log from 'loglevel';
import { Result } from 'antd';

/**
 * class component to handle erros
 *
 * @class ErrorBoundary
 * @augments PureComponent
 */
class ErrorBoundary extends PureComponent<App.IErrorBoundaryProps> {
	/**
	 * lifecycle to catch DOM errors
	 *
	 * @param {object|string} error error message
	 * @param {React.ErrorInfo} info {object|string} info stack information of error
	 * @returns {void} componentDidCatch
	 */
	componentDidCatch(error: Error, info: React.ErrorInfo): void {
		const { setError } = this.props.actions;
		if (error && _.isFunction(setError)) {
			setError({ error, info });
		} else {
			log.error(error, info);
		}
	}

	/**
	 * ErrorBoundary Renderer
	 *
	 * @returns {JSX.Element | React.ReactNode } render
	 */
	render(): JSX.Element | React.ReactNode {
		const { error, children } = this.props;
		if (error) {
			return <Result status='warning' title={'Oops! Something went wrong.'} subTitle={'Please try again'} />;
		}
		return children;
	}
}

export default ErrorBoundary;
