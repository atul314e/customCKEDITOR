/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description Content Area Component, contains route mapping
 */

import React, { PureComponent } from 'react';
import { Layout } from 'antd';

import ErrorBoundary from '../ErrorBoundary';
import CKeditor from 'components/Editors/CKEditor';

/**
 * ContentArea comonent
 */
class ContentArea extends PureComponent<App.IContentAreaProps> {
	/**
	 * Component did mount
	 */
	componentDidMount = (): void => {
		const initialLoader: HTMLElement | null = document.getElementById('splash-screen');
		if (initialLoader && initialLoader.parentNode) {
			initialLoader.parentNode.removeChild(initialLoader);
		}
	};
	/**
	 * ContentArea Renderer
	 *
	 * @returns {JSX.Element} render
	 */
	render(): JSX.Element {
		return (
			<Layout.Content style={{ padding: '40px' }}>
				<ErrorBoundary>
					<CKeditor />
				</ErrorBoundary>
			</Layout.Content>
		);
	}
}

export default ContentArea;
