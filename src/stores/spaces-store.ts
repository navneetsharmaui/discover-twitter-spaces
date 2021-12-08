import type { ITwitterSpace } from '$lib/models/interfaces/itwitter-space.interface';
import { writable } from 'svelte/store';

export const spacesStore = writable<ITwitterSpace[]>([]);
