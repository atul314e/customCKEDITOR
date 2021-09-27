/**
 * @author Harish.R <harish.r@314ecorp.com>
 * Connects app the Kea Logic
 */

import React from 'react';

const MainApp = React.lazy(() => import('./App'));

const App: React.FC = () => (
	<React.Suspense fallback={<h1>Taking longer than expected</h1>}>
		<MainApp />
	</React.Suspense>
);

export default App;
