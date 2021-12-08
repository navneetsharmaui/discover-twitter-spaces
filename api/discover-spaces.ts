/**
 * This vercel function will fetch the twitter spaces which are either live or upcoming and return them in a list.
 *
 */

import dotenv from 'dotenv';
import isomorphicFetch from 'isomorphic-fetch';

import { VercelRequest, VercelResponse } from '@vercel/node';

dotenv.config();

export default async (
	request: VercelRequest,
	response: VercelResponse,
): Promise<VercelResponse> => {
	try {
		const TWITTER_TOKEN = process.env.DISCOVER_TWITTER_TOKEN;

		const TWITTER_BASE_API_URL = process.env.DISCOVER_TWITTER_BASE_API_URL;

		const headers = new Headers();

		headers.append('Authorization', `Bearer ${TWITTER_TOKEN}`);

		const httpRequestOptions = {
			headers,
			method: 'GET',
		};

		const { search } = request.query;

		const searchQuery = search ? search : 'Web';

		const spacesSearchQueryParameters =
			'state=all&topic.fields=id,name,description&space.fields=host_ids,created_at,creator_id,id,lang,invited_user_ids,participant_count,speaker_ids,started_at,ended_at,topic_ids,state,title,updated_at,scheduled_start,is_ticketed&expansions=invited_user_ids,speaker_ids,creator_id,host_ids&user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld';

		const url = `${TWITTER_BASE_API_URL}/spaces/search?query=${searchQuery}&${spacesSearchQueryParameters}`;

		const twitterSpacesApiResponse = await isomorphicFetch(url, httpRequestOptions);

		return !twitterSpacesApiResponse.ok
			? response
					.status(twitterSpacesApiResponse.status)
					.send(twitterSpacesApiResponse.statusText)
			: response.status(200).send(JSON.stringify(await twitterSpacesApiResponse.json()));
	} catch (error) {
		return response.status(500).send({
			error: JSON.stringify({
				error: 'Could not fetch spaces.',
			}),
		});
	}
};
