/**
 * @author Harish.R <harish.r@314ecorp.com>
 * @description service worker registration method
 */
import _ from 'lodash';

/**
 * isLocalhost
 */
const regex = /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/;
const isLocalhost = Boolean(
	window.location.hostname === 'localhost' ||
		// [::1] is the IPv6 localhost address.
		window.location.hostname === '[::1]' ||
		// 127.0.0.0/8 are considered localhost for IPv4.
		regex.exec(window.location.hostname),
);

/**
 * service worker registration
 */
const register = (): void => {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			if (!isLocalhost) {
				void navigator.serviceWorker.register(`${_.get(window, 'basePath')}service-worker.js`);
			}
		});
	}
};

export default register;
