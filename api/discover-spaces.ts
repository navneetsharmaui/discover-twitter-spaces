/**
 * This vercel function will fetch the twitter spaces which are either live or upcoming and return them in a list.
 *
 */

import dotenv from 'dotenv';

import { VercelRequest, VercelResponse } from '@vercel/node';

dotenv.config();

export default async (
	request: VercelRequest,
	response: VercelResponse,
): Promise<VercelResponse> => {
	try {
		const { search } = request.query;

		const searchQuery = search ? search : 'Web';

		return response.status(200).send({ message: `Hello ${searchQuery}` });
	} catch (error) {
		return response.status(500).send({
			error: JSON.stringify({
				error: 'Could not fetch spaces.',
			}),
		});
	}
};
