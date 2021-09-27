/**
 * @author Harish.R <harish.r@314ecorp.com>
 * momentUtils test-cases
 */

import { getTime } from 'utils/momentUtils';

describe('MomentUtils function test cases', () => {
	it(`get the provided time in 'hh:mm:ss' format`, () => {
		expect(getTime(0)).toEqual('00:00:00');
		expect(getTime(32882)).toEqual('09:08:02');
		// TODO: need to fix
		expect(getTime(-10 as unknown as number)).not.toBe('00:00:00');
		expect(getTime(12345678912)).not.toBe('0');
		expect(getTime('12345678912A' as unknown as number)).toBe('00:00:00');
	});
});
