export interface IRedisClient {
	get status(): string;
	get connected(): boolean;
	get closed(): boolean;

	get<T>(key: string, parse: (value: string) => T): Promise<T>;

	set<T>(key: string, value: T, expireTime: number): Promise<'OK'>;

	upstashRestGet<T>(key: string, parse: (value: string) => T): Promise<T>;

	upstashRestSet<T>(key: string, value: T, expireTime: number): Promise<string>;

	quit(): Promise<void | 'OK'>;
}
