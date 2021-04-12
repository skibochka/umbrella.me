import { Unauthorized, BadRequest } from 'http-errors';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt';
import redisConnection from '../redis/redisConnection';

export async function httpAuthMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (!req.headers.authorization) {
    throw new BadRequest('No authorization header');
  }

  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    throw new Unauthorized('Please login');
  }

  const redis = redisConnection();
  const existInBlackList = await redis.get(token);

  if (existInBlackList) {
    throw new Unauthorized('Invalid token');
  }

  const userPayload = jwt.verify(token, jwtConfig.secret);

  req.user = {
    id: userPayload.id,
    name: userPayload.name,
    phoneNumber: userPayload.phoneNumber,
    role: userPayload.role,
  };

  return next();
}
