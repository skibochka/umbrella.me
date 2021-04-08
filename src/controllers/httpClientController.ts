import * as express from 'express';
import * as Redis from 'ioredis';
import { User } from '../models/User';
import { model } from '../helpers/db/repository';
import { SeekerRequest } from '../models/SeekerRequest';
import { emitToUser } from '../socket/socketServer';
import { redisConfiguration } from '../config/redis';

async function changeStatus(req: express.Request, res: express.Response) {
  await model(User).update(req.user.id, req.body);

  return res.status(200).json({
    status: req.body.status,
  });
}

async function changeRole(req: express.Request, res: express.Response) {
  await model(User).update(req.user.id, { role: req.body.role });

  return res.status(200).json({
    role: req.body.role,
  });
}

async function sendRequest(req: express.Request, res: express.Response) {
  const request = await model(SeekerRequest).save({
    volunteerId: req.body.volunteerId,
    seekerId: req.user.id,
    intention: req.body.intention,
  });

  const redis: Redis = new Redis(`redis://${redisConfiguration.redisUrl}:${redisConfiguration.redisPort}`);
  const volunteerSocket = await redis.get(req.body.volunteerId);

  await emitToUser(volunteerSocket, 'request.new', request.id);

  return res.status(200).json({
    request,
  });
}
export {
  changeStatus,
  changeRole,
  sendRequest,
};
