import { inject, singleton } from 'tsyringe';
import type Redis from 'ioredis';
import type { Redis as UpstashRedis } from '@upstash/redis';
import LZString from 'lz-string';

import { Logger, LoggerUtils } from '$utils/_logger';
import { RedisConnectionStatus } from '$models/enums/redis-connection-status.enum';
import type { IRedisClient } from '$models/interfaces/iredis-client-config.interface';
import { RedisConfigToken } from '$core/tokens/redis-config.token';
import { UpstashRedisConfigToken } from '$core/tokens/upstash-redis.token';

// eslint-disable-next-line @typescript-eslint/unbound-method
const { compressToUTF16: compress, decompressFromUTF16: decompress } = LZString;
/**
 * Redis client class to handle redis connection and operations with it (e.g. set, get, etc.)
 *
 * @privateRemarks
 * Author - Navneet Sharma
 */
@singleton()
export class RedisClient implements IRedisClient {
	private readonly logger: Logger = LoggerUtils.getInstance('RedisClient');

	private readonly DEFAULT_EXPIRE_TIME = 60 * 60 * 24;

	constructor(
		@inject(RedisConfigToken) private readonly redisToken: Redis,
		@inject(UpstashRedisConfigToken) private readonly upstashRedisToken: UpstashRedis,
	) {}

	public get status(): string {
		return this.redisToken.status;
	}

	/**
	 * This method will give the connected connection status of the redis client.
	 * @returns true/false
	 */
	public get connected(): boolean {
		return this.redisToken.status === RedisConnectionStatus.READY;
	}

	/**
	 * This method will return the closed status of the redis connection.
	 * @returns true/false
	 */
	public get closed(): boolean {
		return this.redisToken.status === RedisConnectionStatus.END;
	}

	/**
	 * This method will get the value from the redis cache. This method will return the value if it is
	 * found in the cache. If the value is not found in the cache, this method will return null.
	 * @param key - The key to get the data from the redis cache.
	 * @param parse - callback function to parse the data.
	 * @returns - Promise of the generic type.
	 */
	public async get<T>(key: string, parse: (value: string) => T = JSON.parse): Promise<T | null> {
		if (this.closed) return null;
		try {
			this.logger.debug('Getting', key);
			const cached = await this.redisToken.get(key);
			this.logger.debug('Got', key, cached ? cached.length : null);
			if (cached) {
				const parsed = decompress(cached);
				this.logger.debug('Parsed', key, parsed?.length);
				return parse(parsed || '');
			}
		} catch (error) {
			this.logger.error('Unable to retrive from cache', key, error);
		}
		return null;
	}

	/**
	 * This method will set the value in the redis cache. This method will also set the expiration time for the
	 * key. The data is compressed using lz-string library and then stored in the redis cache. This method will return
	 * the status of the operation.
	 * @param key - The key to store the data.
	 * @param value - The value to be set.
	 * @param expireTime - The time in seconds after which the key will expire.
	 * @returns - Promise of the string.
	 */
	public async set<T>(
		key: string,
		value: T,
		expireTime = this.DEFAULT_EXPIRE_TIME,
	): Promise<'OK' | null> {
		if (this.closed) return null;
		try {
			return await this.redisToken.set(
				key,
				compress(JSON.stringify(value)),
				'EX',
				expireTime,
			);
		} catch (error) {
			this.logger.error('Unable to cache', key, value, error);
		}
		return null;
	}

	public async upstashRestGet<T>(
		key: string,
		parse: (value: string) => T = JSON.parse,
	): Promise<T | null> {
		try {
			const response = await this.upstashRedisToken.get<string>(key);
			if (response) {
				return parse(decompress(response) || '');
			}
		} catch (error) {
			this.logger.error(error);
		}
		return null;
	}

	public async upstashRestSet<T>(
		key: string,
		value: T,
		expireTime: number,
	): Promise<string | null> {
		try {
			const response = await this.upstashRedisToken.setex(
				key,
				expireTime,
				compress(JSON.stringify(value)),
			);
			return response;
		} catch (error) {
			this.logger.error(error);
		}
		return null;
	}

	/**
	 * This method will close the redis connection.
	 * @returns - Promise of void or 'OK'.
	 */
	public async quit(): Promise<void | 'OK'> {
		return this.closed ? this.redisToken.quit() : Promise.resolve();
	}
}
