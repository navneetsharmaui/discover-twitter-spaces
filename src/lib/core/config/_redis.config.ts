import IORedis from 'ioredis';

const REDIS_CONNECTION_STRING = process.env['DISCOVER_REDIS_CONNECTION'];

const REDIS_OPTIONS: IORedis.RedisOptions = {
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
	? new IORedis(REDIS_CONNECTION_STRING, REDIS_OPTIONS)
	: new IORedis(REDIS_OPTIONS);
