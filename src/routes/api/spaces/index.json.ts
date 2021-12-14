import type { RequestHandler } from '@sveltejs/kit';
import { discoverEnvironmentFacade } from '$core/services/environment/_environment.facade';
import { api } from '$core/services/https/_api';
import { mapToTwitterSpaces } from '$utils/_mapper';

export const get: RequestHandler = async (request) => {
	try {
		const TWITTER_TOKEN = `${discoverEnvironmentFacade.twitterConfig.TWITTER_TOKEN}`
			.trim()
			.slice();

		const TWITTER_BASE_API_URL =
			`${discoverEnvironmentFacade.twitterConfig.TWITTER_BASE_API_URL}`.trim().slice();

		const search = request.query.get('search');

		const searchQuery = search ? search : 'Web';

		const spacesSearchQueryParameters =
			'state=all&topic.fields=id,name,description&space.fields=host_ids,created_at,creator_id,id,lang,invited_user_ids,participant_count,speaker_ids,started_at,ended_at,topic_ids,state,title,updated_at,scheduled_start,is_ticketed&expansions=invited_user_ids,speaker_ids,creator_id,host_ids&user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld';

		const url = `${TWITTER_BASE_API_URL}/spaces/search?query=${searchQuery}&${spacesSearchQueryParameters}`;

		const headers = new Headers();
		headers.append('Authorization', `Bearer ${TWITTER_TOKEN}`);
		headers.append('Content-Type', 'application/json');

		const httpRequestOptions = {
			method: 'GET',
			headers,
		};

		const twitterSpacesApiResponse = await api(url, httpRequestOptions);

		return twitterSpacesApiResponse.status >= 400 && twitterSpacesApiResponse.status < 600
			? {
					status: twitterSpacesApiResponse.status,
					body: JSON.stringify({
						error: 'Could not fetch spaces.',
					}),
			  }
			: {
					status: twitterSpacesApiResponse.status,
					headers: {
						'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
					},
					body: JSON.stringify(mapToTwitterSpaces(twitterSpacesApiResponse.body)),
			  };
	} catch (error) {
		return {
			status: 500,
			body: JSON.stringify({
				error: 'Could not fetch spaces. Error 500',
			}),
		};
	}
};
