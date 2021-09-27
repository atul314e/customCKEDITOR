/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description AppEvents test cases
 */

import _ from 'lodash';

import AppEvents, { Events } from 'utils/AppEvents';

describe('AppEvents class test cases- tests the subscribe and publish methods', () => {
	it('executes the Loading event', () => {
		const mockLoadingFunction = jest.fn();
		AppEvents.subscribe(Events.Loading, mockLoadingFunction);
		AppEvents.publish(Events.Loading, 'loading');
		expect(mockLoadingFunction).toHaveBeenCalledTimes(1);
		expect(mockLoadingFunction).toHaveBeenCalledWith('loading');
		expect(AppEvents.subscribers).toEqual({ [Events.Loading]: [mockLoadingFunction] });
	});

	it('executes the Warning event', () => {
		const mockWarningFunction = jest.fn();
		AppEvents.subscribe(Events.Warn, mockWarningFunction);
		AppEvents.publish(Events.Warn, 'Warning');
		expect(mockWarningFunction).toHaveBeenCalledTimes(1);
		expect(mockWarningFunction).toHaveBeenCalledWith('Warning');
	});

	it('executes the Info event', () => {
		const mockInfoFunction = jest.fn();

		AppEvents.subscribe(Events.Info, mockInfoFunction);
		AppEvents.publish(Events.Info, 'Info');
		expect(mockInfoFunction).toHaveBeenCalledTimes(1);
		expect(mockInfoFunction).toHaveBeenCalledWith('Info');
	});

	it('executes the success event', () => {
		const mockSuccesFunction = jest.fn();

		AppEvents.subscribe(Events.Success, mockSuccesFunction);
		AppEvents.publish(Events.Success, 'success');
		expect(mockSuccesFunction).toHaveBeenCalledTimes(1);
		expect(mockSuccesFunction).toHaveBeenCalledWith('success');
	});

	it('executes the Error event', () => {
		const mockErrorFunction = jest.fn();

		AppEvents.subscribe(Events.Error, mockErrorFunction);
		AppEvents.publish(Events.Error, 'Error');
		expect(mockErrorFunction).toHaveBeenCalledTimes(1);
		expect(mockErrorFunction).toHaveBeenCalledWith('Error');
	});

	it('executes the Notification Success event', () => {
		const mockNotificationSuccess = jest.fn();

		AppEvents.subscribe(Events.N_Success, mockNotificationSuccess);
		AppEvents.publish(Events.N_Success, 'Success Notification');
		expect(mockNotificationSuccess).toHaveBeenCalledTimes(1);
		expect(mockNotificationSuccess).toHaveBeenCalledWith('Success Notification');
	});

	it('executes the Notification Error event', () => {
		const mockNotificationError = jest.fn();

		AppEvents.subscribe(Events.N_Error, mockNotificationError);
		AppEvents.publish(Events.N_Error, 'Error Notification');
		expect(mockNotificationError).toHaveBeenCalledTimes(1);
		expect(mockNotificationError).toHaveBeenCalledWith('Error Notification');
	});

	it('executes the Notification Info event', () => {
		const mockNotificationInfo = jest.fn();

		AppEvents.subscribe(Events.N_Info, mockNotificationInfo);
		AppEvents.publish(Events.N_Info, 'Info Notification');
		expect(mockNotificationInfo).toHaveBeenCalledTimes(1);
		expect(mockNotificationInfo).toHaveBeenCalledWith('Info Notification');
	});

	it('executes the Notification Warning event', () => {
		const mockNotificationWarning = jest.fn();

		AppEvents.subscribe(Events.N_Warn, mockNotificationWarning);
		AppEvents.publish(Events.N_Warn, 'Warning Notification');
		expect(mockNotificationWarning).toHaveBeenCalledTimes(1);
		expect(mockNotificationWarning).toHaveBeenCalledWith('Warning Notification');
	});
});
