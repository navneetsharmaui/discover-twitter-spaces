import 'reflect-metadata';

import dotenv from 'dotenv';
import type { Handle } from '@sveltejs/kit';

dotenv.config();

export const handle: Handle = async ({ request, resolve }) => {
	if (request.url.searchParams.has('_method')) {
		request.method = request.url.searchParams.get('_method').toUpperCase();
	}

	return resolve(request);
};
