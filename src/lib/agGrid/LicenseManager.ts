/**
 * @author Harish <harish.r@314ecorp.com>
 * @description Activate aggrid license
 */

import { LicenseManager } from '@ag-grid-enterprise/core';

import '@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-theme-material.css';
import 'styles/aggrid.css';

const activateLicenseManager = (): void => {
	LicenseManager.setLicenseKey(
		'Hotelsoft_Hotelsoft_single_1_Devs__4_December_2020_[v2]_MTYwNzA0MDAwMDAwMA==fbc0b76ca8c92007c467fbfb606c95f9',
	);
};

export default activateLicenseManager;
