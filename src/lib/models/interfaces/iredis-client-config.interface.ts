export interface IRedisClient {
	get status(): string;
	get connected(): boolean;
	get closed(): boolean;

	get<T>(key: string, parse: (value: string) => T): Promise<T | null>;

	set<T>(key: string, value: T, expireTime: number): Promise<'OK' | null>;

	upstashRestGet<T>(key: string, parse: (value: string) => T): Promise<T | null>;

	upstashRestSet<T>(key: string, value: T, expireTime: number): Promise<string | null>;

	quit(): Promise<void | 'OK'>;
}
