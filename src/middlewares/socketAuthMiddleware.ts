import * as jwt from 'jsonwebtoken';
import * as Redis from 'ioredis';
import jwtConfig from '../config/jwt';
import redisConnection from '../redis/redisConnection';

export async function socketAuthMiddleware(socket, next) {
  const { token } = socket.handshake.auth;
  if (!token) {
    throw new Error('Please login');
  }

  const redis: Redis = redisConnection();
  const existInBlackList = await redis.get(token);

  if (existInBlackList) {
    throw new Error('Invalid token');
  }

  jwt.verify(token, jwtConfig.secret);

  return next();
}
