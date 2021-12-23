import { TwitterSpace } from '$models/classes/twitter-space.class';
import type { IAppState } from '$models/interfaces/iapp-state.interface';
import { writable } from 'svelte/store';

export const APP_STORE = writable<IAppState<TwitterSpace[]>>({
	state: 'EMPTY',
	data: [],
	error: null,
});

export const upateSpaces = (spaces: TwitterSpace[]) => {
	APP_STORE.set({
		state: 'SUCCESS',
		data: spaces.map((space) => new TwitterSpace().deserialize(space)),
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
