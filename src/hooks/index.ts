import 'reflect-metadata';

import dotenv from 'dotenv';
import type { Handle } from '@sveltejs/kit';

dotenv.config();

export const handle: Handle = async ({ request, resolve }) => {
	if (request.query.has('_method')) {
		request.method = request.query.get('_method').toUpperCase();
	}

	const response = await resolve(request);

	return response;
};
