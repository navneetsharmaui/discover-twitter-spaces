import type { ITwitterSpace } from '$models/interfaces/itwitter-space.interface';
import { writable } from 'svelte/store';

export const spacesStore = writable<ITwitterSpace[]>([]);
