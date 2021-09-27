/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description Page component
 */

import React, { PureComponent, useEffect } from 'react';
import _ from 'lodash';
import log from 'loglevel';
import { PageHeaderProps } from 'antd/lib/page-header/index';
import { Result, Spin, PageHeader } from 'antd';

/**
 * Page props
 *
 * @interface IPageProps
 */
interface IPageProps extends PageHeaderProps {
	/**
	 *
	 * docTitle
	 *
	 * @type {string}
	 * @memberof IPageProps
	 */
	docTitle?: string;
	/**
	 *
	 * error
	 *
	 * @type {boolean}
	 * @memberof IPageProps
	 * optional
	 */
	error?: boolean;
	/**
	 *
	 * loading
	 *
	 * @type {boolean}
	 * @memberof IPageProps
	 * optional
	 */
	loading?: boolean;
	/**
	 *
	 * children
	 *
	 * @type {any}
	 * @memberof IPageProps
	 * optional
	 */
	children?: any;
}

/**
 * class component for Page
 *
 * @class Page
 * @augments PureComponent
 * @exports
 */
export class Page extends PureComponent<IPageProps> {
	/**
	 *
	 * defaultProps
	 *
	 * @static
	 * @memberof Page
	 */
	static defaultProps = {
		title: '',
		subTitle: '',
		error: false,
		loading: false,
		extra: [],
	};

	/**
	 * render error page if error true
	 *
	 * @param root0
	 * @param root0.error
	 * @memberof Page
	 */
	static ErrorPage = ({ error }: IPageProps): JSX.Element | null =>
		error ? (
			<Result status={403} title='Oops...' subTitle='Sorry, we are having trouble showing the data!' />
		) : null;

	/**
	 * render children only if no loading or not having error
	 *
	 * @param {IPageProps} param0
	 * @memberof Page
	 */
	static Children = ({ error, loading, children }: IPageProps): JSX.Element | null => {
		if (error) {
			return null;
		}
		return <Spin spinning={loading}>{children}</Spin>;
	};

	/** Page Renderer */
	render(): JSX.Element {
		const { children, error, loading, title, subTitle, extra } = this.props;
		return (
			<PageHeader
				title={title}
				subTitle={subTitle}
				extra={!loading && extra}
				className={this.props.className}
				onBack={this.props.onBack}
			>
				{React.Children.map(children, (childElement) => {
					return React.cloneElement(childElement as React.ReactElement<any>, {
						error,
						loading,
					});
				})}
			</PageHeader>
		);
	}
}

/**
 * compund component for Page
 *
 * @param {IPageProps} props
 */
const pageWrapper: React.FC<IPageProps> = (props) => {
	const { docTitle, children, ...restProps } = props;

	useEffect(() => {
		if (_.isString(docTitle)) {
			document.title = docTitle;
		} else {
			log.error('[PAGE] Title is not string. Provide docTitle for the Page');
		}
	}, [docTitle]);

	return (
		<Page {...restProps}>
			<Page.ErrorPage />
			<Page.Children> {children} </Page.Children>
		</Page>
	);
};

export default pageWrapper;
