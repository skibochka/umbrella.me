export const redisConfiguration = {
  redisUrl: process.env.REDIS_URL,
  redisPort: process.env.REDIS_PORT,
  refreshExpirationTime: 86400,
  accessExpirationTime: 3000,
};
