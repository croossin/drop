const Redis = require("ioredis");

export const redisClient = new Redis(process.env.UPSTASH_CONNECTION_URL);
