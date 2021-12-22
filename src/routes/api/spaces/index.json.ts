import { Logger, LoggerUtils } from '$lib/utils/_logger';
import type { RequestHandler } from '@sveltejs/kit';
import { performance } from 'perf_hooks';
import { TwitterSpacesAPIService } from './_twitter-spaces-api.service';

export const get: RequestHandler = async (request) => {
	try {
		const logger: Logger = LoggerUtils.getInstance('spaced-api');

		const start = performance.now();
		const search = request.query.get('search');

		const searchQuery = search ? search : 'Web';

		const twitterSpacesAPIService = new TwitterSpacesAPIService();
		const twitterSpacesApiResponse = await twitterSpacesAPIService.getSpacesFromCache(
			searchQuery,
		);
		logger.debug('Time Elapsed till cache: ', (performance.now() - start) / 1000);

		if (twitterSpacesApiResponse && twitterSpacesApiResponse.length > 0) {
			logger.debug(
				'Cached response - Total elapsed time: ',
				(performance.now() - start) / 1000,
			);
			return {
				status: 200,
				headers: {
					'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
				},
				body: JSON.stringify(twitterSpacesApiResponse),
			};
		} else {
			const response = await twitterSpacesAPIService.getSpacesFromAPI(searchQuery);
			logger.debug(
				'Uncached response - Total elapsed time: ',
				(performance.now() - start) / 1000,
			);
			return response;
		}
	} catch (error) {
		return {
			status: 500,
			body: JSON.stringify({
				error: 'Could not fetch spaces. Error 500',
			}),
		};
	}
};
