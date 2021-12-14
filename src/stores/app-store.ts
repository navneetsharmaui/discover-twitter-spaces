import type { ITwitterSpace } from '$models/interfaces/itwitter-space.interface';
import type { IAppState } from '$models/interfaces/iapp-state.interface';
import { writable } from 'svelte/store';

export const APP_STORE = writable<IAppState<ITwitterSpace[]>>({
	state: 'EMPTY',
	data: [],
	error: null,
});

export const upateSpaces = (spaces: ITwitterSpace[]) => {
	APP_STORE.set({
		state: 'SUCCESS',
		data: spaces,
		error: null,
	});
};

export const loadingState = () => {
	APP_STORE.set({
		state: 'PENDING',
		data: [],
		error: null,
	});
};

export const errorState = (error: Error) => {
	APP_STORE.set({
		state: 'ERROR',
		data: [],
		error,
	});
};
