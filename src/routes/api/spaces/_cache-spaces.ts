/* eslint-disable no-console */
import redis, { getSearchedSpacesKey } from '$core/config/_redis';
import { discoverEnvironmentFacade } from '$core/services/_environment.facade';
import { api } from '$core/services/_api';

import { mapToTwitterSpaces } from '$utils/_mapper';

import type { ISpacesMetaResponse } from '$models/interfaces/ispaces-meta-response.interface';
import type { ITwitterSpace } from '$models/interfaces/itwitter-space.interface';

export const cacheSpacesResponse = async (
	searchedTerm: string,
	spaces: ISpacesMetaResponse,
): Promise<void> => {
	try {
		await redis.set(
			getSearchedSpacesKey(searchedTerm),
			JSON.stringify(spaces),
			'EX',
			0.5 * 60 * 60,
		);
	} catch (error) {
		console.log('Unable to cache', searchedTerm, error);
	}
};

export const getSpacesFromCache = async (
	searchTerm: string,
): Promise<ITwitterSpace[] | Record<string, never>> => {
	try {
		const cached = await redis.get(getSearchedSpacesKey(searchTerm));
		return cached ? mapToTwitterSpaces(JSON.parse(cached)) : {};
	} catch (error) {
		console.log('Unable to retrive from cache', searchTerm, error);
	}
	return {};
};

export const getSpacesFromAPI = async (
	searchTerm: string,
): Promise<{
	body: string;
	status: number;
}> => {
	const TWITTER_TOKEN = `${process.env['DISCOVER_TWITTER_TOKEN']}`.trim().slice();

	const TWITTER_BASE_API_URL = `${discoverEnvironmentFacade.twitterConfig.TWITTER_BASE_API_URL}`
		.trim()
		.slice();

	const spacesSearchQueryParameters =
		'state=all&topic.fields=id,name,description&space.fields=host_ids,created_at,creator_id,id,lang,invited_user_ids,participant_count,speaker_ids,started_at,ended_at,topic_ids,state,title,updated_at,scheduled_start,is_ticketed&expansions=invited_user_ids,speaker_ids,creator_id,host_ids&user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld';

	const url = `${TWITTER_BASE_API_URL}/spaces/search?query=${searchTerm}&${spacesSearchQueryParameters}`;

	const headers = new Headers();
	headers.append('Authorization', `Bearer ${TWITTER_TOKEN}`);
	headers.append('Content-Type', 'application/json');

	const httpRequestOptions = {
		method: 'GET',
		headers,
	};

	const twitterSpacesApiResponse = await api<ISpacesMetaResponse>(url, httpRequestOptions);

	if (twitterSpacesApiResponse.status >= 200 && twitterSpacesApiResponse.status < 300) {
		await cacheSpacesResponse(searchTerm, twitterSpacesApiResponse.body);
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
};
