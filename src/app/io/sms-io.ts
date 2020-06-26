import {SmsOptions} from '@ionic-native/sms/ngx';
import {App} from '../app';
import {Mockup} from './mockup/mockup';
import {Gt901Mockup} from './mockup/gt-901-mockup';

/**
 * Handles the mobile SMS IO, used to send and receive SMS.
 *
 * Also handles mock data environment for browser testing.
 */
export class SmsIo {
	/**
	 * Mockup object used to fake comunication when running on development under a browser.
	 */
	public static mockup: Mockup = null;

	/**
	 * Method used to process SMS received, receives the parameters (message, phoneNumber).
	 */
	public static onReceive: Function = null;

	/**
	 * Start SMS listener
	 */
	public static startListener(onReceive?: Function) {
		if (onReceive !== undefined) {
			this.onReceive = onReceive;
		}

		if (App.isMobile()) {
			// @ts-ignore
			if (window.SMSReceive !== undefined) {
				// @ts-ignore
				window.SMSReceive.startWatch(() => {
					console.log('CarTracker: SMS Receiver watcher started.');
				}, () => {
					console.warn('CarTracker: Failed to start watching for SMS.');
				});

				// SMS Received event
				document.addEventListener('onSMSArrive', (e: any) => {
					console.log('CarTracker: SMS data received.', e, e.data);
					this.onReceive(e.data.body, e.data.address);
				});
			} else {
				console.warn('CarTracker: SMSReceive plugin undefined.');
			}
		} else {
			this.mockup = new Gt901Mockup(this.onReceive);

		}
	}

	/**
	 * Stop the SMS receiver watcher, should be stopped when exiting the application to prevent leaks.
	 */
	public static stopListener() {
		if (App.isMobile()) {
			// @ts-ignore
			if (window.SMSReceive !== undefined) {
				// @ts-ignore
				window.SMSReceive.stopWatch(() => {
					console.log('CarTracker: SMS Receiver watching stopped.');
				});
			}
		}
	}

	/**
	 * Send SMS to phone number.
	 *
	 * @param phoneNumber Destination phone number.
	 * @param message Message content
	 * @param onSuccess OnSuccess optional callback function.
	 * @param onError OnError optional callback function.
	 */
	public static sendSMS(phoneNumber: string, message: string, onSuccess?: Function, onError?: Function) {
		if (App.isMobile()) {
			App.androidPermissions.requestPermission(App.androidPermissions.PERMISSION.SEND_SMS).then(() => {
				let options: SmsOptions = {
					replaceLineBreaks: false,
					android: {
						intent: ''
					}
				};

				if (App.sms.hasPermission()) {
					App.sms.send(phoneNumber, message, options).then(() => {
						if (onSuccess !== undefined) {
							onSuccess();
						}
					}).catch(() => {
						if (onError !== undefined) {
							onError();
						}
					});
				}
			});
		} else {
			this.mockup.sendSMS(message, phoneNumber);

			if (onSuccess !== undefined) {
				onSuccess();
			}
		}
	}

}
