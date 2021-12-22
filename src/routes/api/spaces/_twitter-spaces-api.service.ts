import redis from '$core/config/_redis';
import { discoverEnvironmentFacade } from '$core/services/_environment.facade';
import { api } from '$core/services/_api';

import type { ISpacesMetaResponse } from '$models/interfaces/ispaces-meta-response.interface';
import type { ITwitterSpace } from '$models/interfaces/itwitter-space.interface';
import type { RedisClient } from '$models/classes/redis-client.class';

import { mapToTwitterSpaces } from '$utils/_mapper';
import { Logger, LoggerUtils } from '$utils/_logger';

export class TwitterSpacesAPIService {
	private redisClient!: RedisClient;

	private readonly DEFAULT_REDIS_CACHE_TTL = 1 * 60 * 60;

	private readonly TWITTER_TOKEN = `${process.env['DISCOVER_TWITTER_TOKEN']}`.trim().slice();
	private readonly TWITTER_BASE_API_URL =
		`${discoverEnvironmentFacade.twitterConfig.TWITTER_BASE_API_URL}`.trim().slice();

	private readonly SPACES_SEARCH_PARAMETERS =
		'state=all&topic.fields=id,name,description&space.fields=host_ids,created_at,creator_id,id,lang,invited_user_ids,participant_count,speaker_ids,started_at,ended_at,topic_ids,state,title,updated_at,scheduled_start,is_ticketed&expansions=invited_user_ids,speaker_ids,creator_id,host_ids&user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld';

	private readonly logger: Logger = LoggerUtils.getInstance('TwitterSpacesAPIService');

	constructor() {
		this.redisClient = redis;
	}

	private getSearchedSpacesKey(searchTerm: string): string {
		return `spaces-${searchTerm.toLowerCase()}`;
	}

	private closeConnection(): void {
		this.redisClient.quit();
	}

	private async cacheSpacesResponse(
		searchedTerm: string,
		spaces: ISpacesMetaResponse,
	): Promise<void> {
		try {
			await this.redisClient.set<ISpacesMetaResponse>(
				this.getSearchedSpacesKey(searchedTerm),
				spaces,
				this.DEFAULT_REDIS_CACHE_TTL,
			);
			this.closeConnection();
		} catch (error) {
			this.logger.error('Unable to cache', searchedTerm, error);
		}
	}

	public async getSpacesFromCache(
		searchTerm: string,
	): Promise<ITwitterSpace[] | Record<string, never>> {
		try {
			const cached = await this.redisClient.get<ISpacesMetaResponse>(
				this.getSearchedSpacesKey(searchTerm),
				JSON.parse,
			);
			this.closeConnection();
			return cached ? mapToTwitterSpaces(cached) : {};
		} catch (error) {
			this.logger.error('Unable to retrive from cache', searchTerm, error);
		}
		return {};
	}

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
}
