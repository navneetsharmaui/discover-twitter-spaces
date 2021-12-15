import { api } from './_api';
import type { ITwitterSpace } from '$models/interfaces/itwitter-space.interface';
import { APP_STORE, errorState, loadingState, upateSpaces } from '$stores/app-store';

export const spacesSWR = (url: string) => {
	loadingState();

	api<ITwitterSpace[]>(url)
		.then((response) => {
			if (response.status >= 200 && response.status < 300) {
				upateSpaces(response.body);
			} else {
				errorState(new Error(`${url} returned status ${response.status}`));
			}
		})
		.catch((error) => {
			errorState(error);
		});

	return APP_STORE;
};
