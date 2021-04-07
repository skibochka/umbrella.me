import * as jwt from 'jsonwebtoken';
import * as Redis from 'ioredis';
import { redisConfiguration } from '../config/redis';
import jwtConfig from '../config/jwt';

export async function socketAuthMiddleware(socket, next) {
  const { token } = socket.handshake.auth;
  if (!token) {
    throw new Error('Please login');
  }

  const redis: Redis = new Redis(`redis://${redisConfiguration.redisUrl}:${redisConfiguration.redisPort}`);
  const existInBlackList = await redis.get(token);

  if (existInBlackList) {
    throw new Error('Invalid token');
  }

  jwt.verify(token, jwtConfig.secret);

  return next();
}
