import type { RequestHandler } from '@sveltejs/kit';
import { getSpacesFromAPI, getSpacesFromCache } from './_cache-spaces';

export const get: RequestHandler = async (request) => {
	try {
		const search = request.query.get('search');

		const searchQuery = search ? search : 'Web';

		const twitterSpacesApiResponse = await getSpacesFromCache(searchQuery);

		return twitterSpacesApiResponse && twitterSpacesApiResponse.length > 0
			? {
					status: 200,
					headers: {
						'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
					},
					body: JSON.stringify(twitterSpacesApiResponse),
			  }
			: await getSpacesFromAPI(searchQuery);
	} catch (error) {
		return {
			status: 500,
			body: JSON.stringify({
				error: 'Could not fetch spaces. Error 500',
			}),
		};
	}
};
