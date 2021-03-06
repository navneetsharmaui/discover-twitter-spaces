import type { RedisOptions } from 'ioredis';
import IORedis from 'ioredis';

const REDIS_CONNECTION_STRING = process.env.REDIS_CONNECTION;

const REDIS_OPTIONS: RedisOptions = {
	retryStrategy: (times: number) => {
		if (times > 0) {
			return null;
		}
		return 50;
	},
	connectTimeout: 20000,
};

export default REDIS_CONNECTION_STRING && REDIS_CONNECTION_STRING !== undefined
	? new IORedis(REDIS_CONNECTION_STRING, REDIS_OPTIONS)
	: new IORedis(REDIS_OPTIONS);
