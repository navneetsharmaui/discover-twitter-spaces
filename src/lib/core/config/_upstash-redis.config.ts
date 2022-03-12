import { Redis as UpstashRedis } from '@upstash/redis';

const UPSTASH_REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;

const UPSTASH_REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

export default new UpstashRedis({
	url: UPSTASH_REDIS_URL || '',
	token: UPSTASH_REDIS_TOKEN || '',
});
