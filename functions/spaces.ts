/**
 * This function will fetch the twitter spaces which are either live or upcoming and return them in a list.
 *
 * @param context The context of the function.
 * @param spaceType The type of space to fetch.
 * @param limit The number of spaces to fetch.
 * @param offset The offset of the spaces to fetch.
 * @returns The list of spaces.
 * @throws An error if the space type is invalid.
 * @throws An error if the limit is invalid.
 * @throws An error if the offset is invalid.
 * @throws An error if the spaces could not be fetched.
 */

import isomorphicFetch from 'isomorphic-fetch';

const twitterToken = process.env.TWITTER_TOKEN;

const headers = new Headers();

headers.append('Authorization', `Bearer ${twitterToken}`);

const spacesSearchQueryParameters =
	'space.fields=creator_id,host_ids,id,lang,scheduled_start,speaker_ids,state,title&expansions=speaker_ids,creator_id,host_ids&user.fields=id,name,profile_image_url,username';

const httpRequestOptions = {
	headers,
	method: 'GET',
};

export const requestHandler = async (event: {
	headers: string;
}): Promise<{
	statusCode: number;
	body: string;
}> => {
	const searchItem = event.headers.search;

	try {
		const response = await isomorphicFetch(
			`https://api.twitter.com/2/spaces/search?query=${searchItem}&${spacesSearchQueryParameters}`,
			httpRequestOptions,
		);

		if (!response.ok) {
			return {
				statusCode: response.status,
				body: JSON.stringify({
					error: 'Could not fetch spaces.',
				}),
			};
		}

		const payload = await response.json();

		return {
			statusCode: 200,
			body: JSON.stringify(payload),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({
				error: 'Could not fetch spaces.',
			}),
		};
	}
};
