import { Unauthorized } from 'http-errors';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as Redis from 'ioredis';
import jwtConfig from '../config/jwt';
import { redisConfiguration } from '../config/redis';

export async function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    throw new Unauthorized('Please login');
  }

  const redis: Redis = new Redis(`redis://${redisConfiguration.redisUrl}:${redisConfiguration.redisPort}`);
  const existInBlackList = await redis.get(token);

  if (existInBlackList) {
    throw new Unauthorized('Invalid token');
  }

  const userPayload = jwt.verify(token, jwtConfig.secret);

  req.user = {
    id: userPayload.id,
    isAdmin: userPayload.isAdmin,
  };

  return next();
}
