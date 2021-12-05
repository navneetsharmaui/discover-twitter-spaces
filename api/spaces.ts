/**
 * This vercel function will fetch the twitter spaces which are either live or upcoming and return them in a list.
 *
 */

import dotenv from 'dotenv';
import isomorphicFetch from 'isomorphic-fetch';

import { VercelRequest, VercelResponse } from '@vercel/node';

dotenv.config();

const TWITTER_TOKEN = process.env.DISCOVER_TWITTER_TOKEN;

const TWITTER_BASE_API_URL = process.env.DISCOVER_TWITTER_BASE_API_URL;

const headers = new Headers();

headers.append('Authorization', `Bearer ${TWITTER_TOKEN}`);

const spacesSearchQueryParameters =
	'space.fields=creator_id,host_ids,id,lang,scheduled_start,speaker_ids,state,title&expansions=speaker_ids,creator_id,host_ids&user.fields=id,name,profile_image_url,username';

const httpRequestOptions = {
	headers,
	method: 'GET',
};

export default async (
	request: VercelRequest,
	response: VercelResponse,
): Promise<VercelResponse> => {
	try {
		const { search } = request.query;

		const searchQuery = search ? `&search=${search}` : '';
		const url = `${TWITTER_BASE_API_URL}/spaces/search?query=${spacesSearchQueryParameters}&${searchQuery}`;
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
