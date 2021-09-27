/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description mock for library axios
 */

export default {
	get: jest.fn(() => Promise.resolve({ data: {} })),
};
