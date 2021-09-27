/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description test cases for LogicUtils method
 */

import { get, pick } from 'utils/logicUtils';

describe('LogicUtils testing', () => {
	describe('get', () => {
		it('get the value by providing key', () => {
			const state = {};
			const payload = { name: 'Practifly' };
			const key = 'name';
			const value = get(key)(state, payload);
			expect(value).toEqual(payload.name);
		});

		it('get the state value if the payload does not contain the provided key in it', () => {
			const state = {};
			const payload = { value: 1 };
			const key = 'name';
			const value = get(key)(state, payload);
			expect(value).toEqual(state);
		});
		it('get the defaults, if the payload does not contain the provided key in it (pass defaults)', () => {
			const state = 'state';
			const payload = { value: '1' };
			const key = 'name';
			const defaults = 'default';
			const value = get<string>(key, defaults)(state, payload);
			expect(value).toEqual(defaults);
		});
		it('state is undefined, should return undefined', () => {
			const state = undefined;
			const payload = { value: '1' };
			const key = 'name';
			const value = get<string | undefined>(key)(state, payload);
			expect(value).toEqual(undefined);
		});
		it('payload undefined, should return state', () => {
			const state = {};
			const payload = undefined;
			const key = 'name';
			const value = get(key)(state, payload as unknown as Record<string, unknown>);
			expect(value).toEqual(state);
		});
		it('state will be empty string and in the payload passing value undefined, should return empty string(state)', () => {
			const value = get('name', 'default')('', { name: undefined as any });
			expect(value).not.toEqual('');
			expect(value).toEqual('default');
		});

		it('state will be empty string, removed default', () => {
			const value = get('name')('', { name: undefined as any });
			expect(value).toEqual('');
		});
	});

	describe('pick', () => {
		it('should pick the name and value keys from the payload and return new object with the picked keys', () => {
			const keys: string[] = ['name', 'value'];
			const payload = { name: 'Practifly', value: 1, id: '314e' };
			const state = {};
			const value = pick<Record<string, any>, string>(keys)(state as Record<string, any>, payload);
			expect(value).toEqual({ name: 'Practifly', value: 1 });
		});

		it('should return empty object, if payload is empty', () => {
			const keys = ['name'];
			const value = pick<Record<string, any>, string>(keys)({}, {});
			expect(value).toEqual({});
		});

		it('should return empty object, if the provided keys are not found in the payload', () => {
			const keys = ['name', 'value'];
			const payload = { type: 'pick', amount: 200 };
			const value = pick<Record<string, any>, string>(keys)({}, payload);
			expect(value).toEqual({});
		});
		it('should return empty object, when payload and keys are undefined', () => {
			expect(pick(undefined as unknown as any)(undefined, undefined as any)).toEqual({});
		});
	});
});
