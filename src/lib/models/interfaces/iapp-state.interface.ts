import type { STATE } from '../types/state.type';
import type { ITwitterSpace } from './itwitter-space.interface';

export interface IAppState<T = ITwitterSpace[]> {
	state: STATE;
	data?: T | null;
	error?: Error | null;
}
