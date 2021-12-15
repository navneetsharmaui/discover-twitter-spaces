import Redis from 'ioredis';

const connectionString = process.env['DISCOVER_REDIS_CONNECTION'];

export default connectionString ? new Redis(connectionString) : new Redis();
