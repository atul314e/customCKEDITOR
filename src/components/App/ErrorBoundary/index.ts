/**
 * Description
 * @author Harish.R <harish.r@314ecorp.com>
 */

import { connect } from 'kea';

import ErrorBoundary from './ErrorBoundary';
import appLogic from 'logics/AppLogic';

const logic = connect({
	values: [appLogic, ['error']],
	actions: [appLogic, ['setError']],
});

export default logic(ErrorBoundary);
