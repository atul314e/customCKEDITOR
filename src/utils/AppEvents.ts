/**
 * Event Bus using pub/sub design pattern
 *
 * @author Harish.R <harish.r@314ecorp.com>
 */

import _ from 'lodash';
import log from 'loglevel';

/**
 * Events
 */
enum Events {
	Loading = 'M_LOADING',
	Warn = 'M_WARN',
	Info = 'M_INFO',
	Success = 'M_SUCCESS',
	Error = 'M_ERROR',
	N_Loading = 'N_LOADING',
	N_Warn = 'N_WARN',
	N_Info = 'N_INFO',
	N_Success = 'N_SUCCESS',
	N_Error = 'N_ERROR',
	Modal_Success = 'M_SUCCESS',
	Modal_Error = 'M_ERROR',
	Modal_Info = 'M_INFO',
	Modal_Warn = 'M_WARN',

	M_Success = 'MO_SUCCESS',
	M_Error = 'MO_ERROR',
	M_Info = 'MO_INFO',
	M_Warn = 'MO_WARN',

	Land = 'APP_LAND',
}

enum Messages {
	Success = 'Success.',
	Error = 'Something went wrong! Please try after sometime.',
	AuthorizationError = 'You do not have the authorization for this action. Please talk to your manager!',
}

/**
 * App Events
 *
 * @class
 */
class AppEvents {
	/**
	 * All Subscriptions
	 *
	 * @member subscribers
	 */
	subscribers: Record<string, any>;
	constructor() {
		this.subscribers = {};
	}

	/**
	 * publish an event
	 *
	 * @function publish
	 * @param {string} event event
	 * @param {...any} rest rest
	 */
	publish = (event: string, ...rest: any) => {
		if (_.has(this.subscribers, event)) {
			_.forOwn(_.get(this.subscribers, event), (callback: any) => {
				try {
					// TODO execution context check
					if (_.isFunction(callback)) {
						callback?.(...rest);
					} else {
						throw `${event} Not a Function`;
					}
				} catch (ex) {
					log.error(`[Eventbus] ${ex}`);
				}
			});
		}
	};

	/**
	 * Subscribes an event
	 *
	 * @function subscribe
	 * @param {event} event event
	 * @param {Function} callback callback
	 */
	subscribe = (event: string, callback: any) => {
		if (!_.isFunction(callback)) {
			log.error(`[Eventbus] ${callback} is not a function`);
			return;
		}

		let listeners = _.get(this.subscribers, event);
		listeners = _.isArray(listeners) ? [...listeners, callback] : [callback];
		_.setWith(this.subscribers, event, listeners, Object);
	};

	/**
	 * Un-subscribes an event
	 *
	 * @param {string} event event
	 */
	unsubscribe = (event: string) => {
		_.unset(this.subscribers, event);
	};
}

export default new AppEvents();

export { Events, Messages };
