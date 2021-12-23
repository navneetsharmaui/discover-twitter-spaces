import { inject, singleton } from 'tsyringe';
import type { Redis } from 'ioredis';
import LZString from 'lz-string';

import { Logger, LoggerUtils } from '$utils/_logger';
import { REDIS_CONNECTION_STATUS } from '$models/enums/redis-connection-status.enum';
import type { IRedisClient } from '$models/interfaces/iredis-client-config.interface';
import { RedisConfigToken } from '$core/tokens/redis-config.token';

const { compressToUTF16: compress, decompressFromUTF16: decompress } = LZString;
/**
 * @class RedisClient
 * @description Redis client class to handle redis connection and operations with it (e.g. set, get, etc.)
 *
 * @author Navneet Sharma
 */
@singleton()
export class RedisClient implements IRedisClient {
	private readonly logger: Logger = LoggerUtils.getInstance('RedisClient');

	private readonly DEFAULT_EXPIRE_TIME = 60 * 60 * 24;

	constructor(@inject(RedisConfigToken) private readonly redis: Redis) {}

	public get status(): string {
		return this.redis.status;
	}

	/**
	 * @description This method will give the connected connection status of the redis client.
	 * @returns true/false
	 */
	public get connected(): boolean {
		return this.redis.status === REDIS_CONNECTION_STATUS.READY;
	}

	/**
	 * @description This method will return the closed status of the redis connection.
	 * @returns true/false
	 */
	public get closed(): boolean {
		return this.redis.status === REDIS_CONNECTION_STATUS.END;
	}

	/**
	 * @description This method will get the value from the redis cache. This method will return the value if it is
	 * found in the cache. If the value is not found in the cache, this method will return null.
	 * @param key The key to get the data from the redis cache.
	 * @param parse callback function to parse the data.
	 * @returns {Promise<T>}
	 */
	public async get<T>(key: string, parse: (value: string) => T = JSON.parse): Promise<T> {
		if (this.closed) return;
		try {
			const cached = await this.redis.get(key);
			return cached ? parse(decompress(cached)) : null;
		} catch (error) {
			this.logger.error('Unable to retrive from cache', key, error);
		}
		return null;
	}

	/**
	 * @description This method will set the value in the redis cache. This method will also set the expiration time for the
	 * key. The data is compressed using lz-string library and then stored in the redis cache. This method will return
	 * the status of the operation.
	 * @param key The key to store the data.
	 * @param value The value to be set.
	 * @param expireTime The time in seconds after which the key will expire.
	 * @returns {Promise<string>}
	 */
	public async set<T>(
		key: string,
		value: T,
		expireTime = this.DEFAULT_EXPIRE_TIME,
	): Promise<'OK'> {
		if (this.closed) return;
		try {
			return await this.redis.set(key, compress(JSON.stringify(value)), 'EX', expireTime);
		} catch (error) {
			this.logger.error('Unable to cache', key, value, error);
		}
	}

	/**
	 * @description This method will close the redis connection.
	 * @returns {Promise<void>}
	 */
	public async quit(): Promise<void | 'OK'> {
		return this.closed ? this.redis.quit() : Promise.resolve();
	}
}
