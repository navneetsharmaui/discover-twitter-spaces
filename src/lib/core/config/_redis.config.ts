import Redis from 'ioredis';

import { RedisClient } from '$core/config/_redis-client.config';

const REDIS_CONNECTION_STRING = process.env['DISCOVER_REDIS_CONNECTION'];

const REDIS_OPTIONS: Redis.RedisOptions = {
	retryStrategy: (times: number) => {
		if (times > 0) {
			return null;
		} else {
			return 50;
		}
	},
	connectTimeout: 500,
};

export default REDIS_CONNECTION_STRING && REDIS_CONNECTION_STRING !== undefined
	? new RedisClient(new Redis(REDIS_CONNECTION_STRING, REDIS_OPTIONS))
	: new RedisClient(new Redis(REDIS_OPTIONS));
