/* eslint-disable no-console */
import type { Redis } from 'ioredis';
import { compressToUTF16, decompressFromUTF16 } from 'lz-string';

import { Logger, LoggerUtils } from '$utils/_logger';
import { REDIS_CONNECTION_STATUS } from '$models/enums/redis-connection-status.enum';

export class RedisClient {
	private redis: Redis;

	private readonly logger: Logger = LoggerUtils.getInstance('RedisClient');

	private readonly DEFAULT_EXPIRE_TIME = 60 * 60 * 24;

	constructor(redis: Redis) {
		this.redis = redis;
	}

	public get status(): string {
		return this.redis.status;
	}

	public get connected(): boolean {
		return this.redis.status === REDIS_CONNECTION_STATUS.READY;
	}

	public get closed(): boolean {
		return this.redis.status === REDIS_CONNECTION_STATUS.END;
	}

	public async get<T>(key: string, parse: (value: string) => T = JSON.parse): Promise<T> {
		if (this.closed) return;
		try {
			const cached = await this.redis.get(key);
			return cached ? parse(decompressFromUTF16(cached)) : null;
		} catch (error) {
			this.logger.error('Unable to retrive from cache', key, error);
		}
		return null;
	}

	public async set<T>(key: string, value: T, expire = this.DEFAULT_EXPIRE_TIME): Promise<'OK'> {
		if (this.closed) return;
		try {
			return await this.redis.set(key, compressToUTF16(JSON.stringify(value)), 'EX', expire);
		} catch (error) {
			console.log('Unable to cache', key, value, error);
		}
	}

	public async quit(): Promise<void | 'OK'> {
		return this.closed ? this.redis.quit() : Promise.resolve();
	}
}
