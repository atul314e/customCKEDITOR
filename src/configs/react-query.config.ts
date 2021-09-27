/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description config for react query
 */
const config = {
	defaultOptions: {
		queries: {
			retry: false,
			retryDelay: 5000,
			refetchOnWindowFocus: false,
		},
	},
};

export default config;
