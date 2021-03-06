import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { Conflict, NotFound, Unauthorized } from 'http-errors';
import * as uniqueId from 'uniqid';
import jwtConfig from '../config/jwt';
import { model } from '../helpers/db/repository';
import { User } from '../models/User';
import { redisConfiguration } from '../config/redis';
import redisConnection from '../redis/redisConnection';

async function signUp(req: express.Request, res: express.Response) {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const fileNameId = uniqueId();

  fs.writeFileSync(`src/public/photos/${fileNameId}-${req.files.avatar.name}`, req.files.avatar.data);
  req.body.photo = `src/public/photos/${fileNameId}-${req.files.avatar.name}`;

  const user: User = await model(User).save(req.body);
  return res.json({
    id: user.id,
    name: user.name,
    phoneNumber: user.phoneNumber,
  });
}

async function signIn(req: express.Request, res: express.Response) {
  const user: User = await model(User).findOne({ phoneNumber: req.body.phoneNumber });
  if (!user) {
    throw new NotFound('Sorry such user does not exist');
  }

  const passwordCompare = await bcrypt.compare(req.body.password, user.password);
  if (!passwordCompare) {
    throw new Unauthorized('Wrong password!');
  }

  const access = jwt.sign({
    id: user.id,
    phoneNumber: user.phoneNumber,
    role: user.role,
    name: user.name,
  }, jwtConfig.secret, jwtConfig.accessExpirationTime);
  const refresh = jwt.sign({ id: user.id, phoneNumber: user.phoneNumber }, jwtConfig.secret, jwtConfig.refreshExpirationTime);

  return res.json({
    access,
    refresh,
  });
}

async function signOut(req: express.Request, res: express.Response) {
  const redis = redisConnection();

  await redis.set(req.body.access, 'access', 'EX', redisConfiguration.accessExpirationTime);
  await redis.set(req.body.refresh, 'refresh', 'EX', redisConfiguration.refreshExpirationTime);

  res.status(200).json({
    msg: 'Logged out',
  });
}

export {
  signUp,
  signIn,
  signOut,
};
