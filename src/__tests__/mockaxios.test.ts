/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description example test for mock api for axios
 */

import mockAxios from 'axios';

import mocktry from '../mockaxiosfunc';

describe('mock test', () => {
	it('run test', async () => {
		const get = mockAxios.get as jest.Mock;
		// mock response data, it applies only once
		get.mockImplementationOnce(() => Promise.resolve({ data: { results: [] } }));

		const data = await mocktry();

		// response value
		expect(data).toEqual([]);
		// check how many times it's get called
		expect(get).toHaveBeenCalledTimes(1);
		// check called with what parameter
		expect(get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/1');
	});
});
