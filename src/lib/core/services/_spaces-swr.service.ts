import type { TwitterSpace } from '$models/classes/twitter-space.class';
import { APP_STORE, errorState, loadingState, upateSpaces } from '$stores/app-store';
import { api } from './_api.service';

export const spacesSWR = (url: string) => {
	loadingState();

	api<TwitterSpace[]>(url)
		.then((response) => {
			if (
				response.status &&
				response.status >= 200 &&
				response.status < 300 &&
				response.body
			) {
				upateSpaces(response.body);
			} else if (response.status && response.status >= 400) {
				errorState(new Error(`${url} returned status ${response.status}`));
			}
		})
		.catch((error: Error) => {
			errorState(error);
		});

	return APP_STORE;
};
