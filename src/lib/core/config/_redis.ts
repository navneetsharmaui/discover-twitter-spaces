import Redis from 'ioredis';

const connectionString = process.env['DISCOVER_REDIS_CONNECTION'];

export function getSearchedSpacesKey(searchTerm: string): string {
	return `spaces:${searchTerm.toLowerCase()}`;
}

export default connectionString ? new Redis(connectionString) : new Redis();
