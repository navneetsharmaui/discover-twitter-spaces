import { inject, singleton } from 'tsyringe';

import type { ISpacesMetaResponse } from '$models/interfaces/ispaces-meta-response.interface';
import type { IRedisClient } from '$models/interfaces/iredis-client-config.interface';
import type { ITwitterSpacesAPIService } from '$models/interfaces/itwitter-spaces-api-service.interface';
import type { TwitterSpace } from '$models/classes/twitter-space.class';

import { discoverEnvironmentFacade } from '$core/services/_environment.facade';
import { RedisClientConfigToken } from '$core/tokens/redis-client-config.token';
import { api } from '$core/services/_api.service';

import { mapToTwitterSpaces } from '$utils/_mapper';
import { Logger, LoggerUtils } from '$utils/_logger';

/**
 * TwitterSpacesAPI. A facade class for the Twitter Spaces API. This class will provide the access to the Twitter Spaces API. This class
 * will also provide the caching mechanism for the Twitter Spaces API and will return the cached data if the data is available.
 *
 * @privateRemarks
 * Author - Navneet Sharma
 */
@singleton()
export class TwitterSpacesAPIService implements ITwitterSpacesAPIService {
	private readonly DEFAULT_REDIS_CACHE_TTL = 1 * 60 * 60;

	private readonly TWITTER_TOKEN = `${process.env.DISCOVER_TWITTER_TOKEN}`.trim().slice();

	private readonly TWITTER_BASE_API_URL =
		`${discoverEnvironmentFacade.twitterConfig.TWITTER_BASE_API_URL}`.trim().slice();

	private readonly SPACES_SEARCH_PARAMETERS =
		'state=all&topic.fields=id,name,description&space.fields=host_ids,created_at,creator_id,id,lang,invited_user_ids,participant_count,speaker_ids,started_at,ended_at,topic_ids,state,title,updated_at,scheduled_start,is_ticketed&expansions=invited_user_ids,speaker_ids,creator_id,host_ids&user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld';

	private readonly logger: Logger = LoggerUtils.getInstance('TwitterSpacesAPIService');

	constructor(@inject(RedisClientConfigToken) private readonly redisClient: IRedisClient) {}

	/**
	 * This method will return the key for the searched spaces. This key will be used to cache the spaces.
	 * @param searchedTerm - The searched term.
	 * @returns The key for the searched spaces.
	 * @returns key for the searched spaces.
	 */
	private static getSearchedSpacesKey(searchTerm: string): string {
		return `spaces-${searchTerm.toLowerCase()}`;
	}

	/**
	 * This method will cache the spaces response in the redis cache using the key provided.
	 * @param searchedTerm - The searched term.
	 * @param spaces - The spaces to cache.
	 * @returns promise of type void.
	 */
	private async cacheSpacesResponse(
		searchedTerm: string,
		spaces: ISpacesMetaResponse,
	): Promise<void> {
		try {
			await this.redisClient.set<ISpacesMetaResponse>(
				TwitterSpacesAPIService.getSearchedSpacesKey(searchedTerm),
				spaces,
				this.DEFAULT_REDIS_CACHE_TTL,
			);
		} catch (error) {
			this.logger.error('Unable to cache', searchedTerm, error);
		}
	}

	/**
	 * This method will return the cached spaces for the provided search term. If the spaces are not cached, this method
	 * will return empty object.
	 * @param searchTerm - The searched term.
	 * @public
	 */
	public async getSpacesFromCache(
		searchTerm: string,
	): Promise<TwitterSpace[] | Record<string, never>> {
		try {
			const cached = await this.redisClient.get<ISpacesMetaResponse>(
				TwitterSpacesAPIService.getSearchedSpacesKey(searchTerm),
				JSON.parse,
			);
			this.logger.debug('Spaces retrieved from cache', cached);
			return cached ? mapToTwitterSpaces(cached) : {};
		} catch (error) {
			this.logger.error('Unable to retrive from cache', searchTerm, error);
		}
		return {};
	}

	/**
	 * This method will return the spaces for the provided search term. If the spaces are not cached, this method will
	 * make a request to the Twitter API and cache the spaces.
	 * @param searchTerm - The searched term.
	 * @param spacesSearchQueryParameters - The spaces search query parameters.
	 * @public
	 */
	public async getSpacesFromAPI(
		searchTerm: string,
		spacesSearchQueryParameters = this.SPACES_SEARCH_PARAMETERS,
	): Promise<{
		body: string;
		status: number;
	}> {
		const url = `${this.TWITTER_BASE_API_URL}/spaces/search?query=${searchTerm}&${spacesSearchQueryParameters}`;

		const headers = new Headers();
		headers.append('Authorization', `Bearer ${this.TWITTER_TOKEN}`);
		headers.append('Content-Type', 'application/json');

		const httpRequestOptions = {
			method: 'GET',
			headers,
		};

		const twitterSpacesApiResponse = await api<ISpacesMetaResponse>(url, httpRequestOptions);

		if (twitterSpacesApiResponse.status >= 200 && twitterSpacesApiResponse.status < 300) {
			await this.cacheSpacesResponse(searchTerm, twitterSpacesApiResponse.body);
			return {
				body: JSON.stringify(mapToTwitterSpaces(twitterSpacesApiResponse.body)),
				status: twitterSpacesApiResponse.status,
			};
		}

		return {
			status: 500,
			body: JSON.stringify({
				error: 'Could not fetch spaces. Error 500',
			}),
		};
	}

	/**
	 * This method will close the redis connection. This method will be called when the service is no longer in use or
	 * when the service is destroyed to avoid memory leaks.
	 */
	public async closeConnection(): Promise<void | 'OK'> {
		await this.redisClient.quit();
	}
}
