export interface IRedisClient {
	get status(): string;
	get connected(): boolean;
	get closed(): boolean;

	get<T>(key: string, parse: (value: string) => T): Promise<T>;

	set<T>(key: string, value: T, expireTime: number): Promise<'OK'>;

	quit(): Promise<void | 'OK'>;
}
