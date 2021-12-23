import 'reflect-metadata';
import { container } from 'tsyringe';
import type { Redis } from 'ioredis';

import type { ITwitterSpacesAPIService } from '$models/interfaces/itwitter-spaces-api-service.interface';
import type { IRedisClient } from '$models/interfaces/iredis-client-config.interface';

import { TwitterSpacesAPIToken } from './tokens/twitter-spaces-api.token';
import { RedisConfigToken } from './tokens/redis-config.token';
import { RedisClientConfigToken } from './tokens/redis-client-config.token';
import { TwitterSpacesAPIService } from './services/_twitter-spaces-api.service';
import ioredis from './config/_redis.config';
import { RedisClient } from './config/_redis-client.config';

container.register<Redis>(RedisConfigToken, {
	useValue: ioredis,
});

container.register<IRedisClient>(RedisClientConfigToken, {
	useClass: RedisClient,
});
export const redisClient = container.resolve<IRedisClient>(RedisClientConfigToken);

container.register(TwitterSpacesAPIToken, {
	useClass: TwitterSpacesAPIService,
});
export const twitterSpacesAPIService =
	container.resolve<ITwitterSpacesAPIService>(TwitterSpacesAPIService);
