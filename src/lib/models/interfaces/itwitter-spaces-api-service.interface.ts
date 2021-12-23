import type { ITwitterSpace } from './itwitter-space.interface';

export interface ITwitterSpacesAPIService {
	getSpacesFromCache(searchTerm: string): Promise<ITwitterSpace[] | Record<string, never>>;

	getSpacesFromAPI(
		searchTerm: string,
		spacesSearchQueryParameters?: string,
	): Promise<{
		body: string;
		status: number;
	}>;
}
