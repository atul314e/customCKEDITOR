/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description App component
 */

import React, { useEffect } from 'react';
import { Layout, Spin } from 'antd';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useValues, useActions } from 'kea';

import Header from './Header';
import ContentArea from './ContentArea';
import RQConfig from 'configs/react-query.config';
import logic from 'logics/AppLogic';
import { PRODUCT } from 'constants/index';
// styles
import 'styles/index';

/**
 * React-query cache config
 */
const queryClient = new QueryClient(RQConfig);

/**
 * App component which contains header, navigation bar, content area
 *
 * @returns {React.FC} App
 */
const App: React.FC = () => {
	const { loading } = useValues<App.IValues>(logic);
	const { syncAppData } = useActions<App.IActions>(logic);

	useEffect(() => {
		document.title = PRODUCT;
		syncAppData('');
	}, []);

	let content;
	if (loading) {
		content = <Spin />;
	} else {
		content = (
			<QueryClientProvider client={queryClient}>
				<Header />
				<ContentArea />
			</QueryClientProvider>
		);
	}

	return (
		<React.StrictMode>
			<Layout>{content}</Layout>
		</React.StrictMode>
	);
};

export default App;
