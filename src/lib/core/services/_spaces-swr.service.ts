import { api } from './_api.service';
import { APP_STORE, errorState, loadingState, upateSpaces } from '$stores/app-store';
import type { TwitterSpace } from '$models/classes/twitter-space.class';

export const spacesSWR = (url: string) => {
	loadingState();

	api<TwitterSpace[]>(url)
		.then((response) => {
			if (response.status >= 200 && response.status < 300) {
				upateSpaces(response.body);
			} else {
				errorState(new Error(`${url} returned status ${response.status}`));
			}
		})
		.catch((error: Error) => {
			errorState(error);
		});

	return APP_STORE;
};
