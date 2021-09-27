/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description Event Emitter function
 */

import _ from 'lodash';
import log from 'loglevel';

/**
 * EventEmitter
 */
class EventEmitter {
	/**
	 * listeners
	 */
	listeners: Record<string, any>;

	constructor() {
		this.listeners = {};
	}

	/**
	 * addListener
	 *
	 * @param {string} event event
	 * @param {string} label label
	 * @param {any} callback callback
	 */
	addListener = (event: string, label: string, callback: any) => {
		if (!_.has(this.listeners, event)) {
			_.setWith(this.listeners, [event, label], {}, Object);
		}
		if (_.isFunction(callback)) {
			_.setWith(this.listeners, [event, label], callback, Object);
		} else {
			log.error(`[Eventbus] ${callback} is not a function`);
		}
	};

	/**
	 * removeListener
	 *
	 * @param {string} event event
	 * @param {string} label label
	 */
	removeListener = (event: string, label?: string) => {
		_.unset(this.listeners, _.compact([event, label]));
	};

	/**
	 * emit
	 *
	 * @param {string} event event
	 * @param {...any} rest rest props
	 */
	emit = (event: string | string[], ...rest: any) => {
		if (_.has(this.listeners, event)) {
			try {
				const callback = _.get(this.listeners, event);
				if (_.isFunction(callback)) {
					callback(...rest);
				} else {
					throw `${event} Not a Function`;
				}
			} catch (ex) {
				log.error(`[EventEmitter] ${ex}`);
			}
		}
	};
}

export default new EventEmitter();
