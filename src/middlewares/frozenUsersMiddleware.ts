import { Unauthorized } from 'http-errors';
import * as express from 'express';
import { model } from '../helpers/db/repository';
import { frozenUser } from '../models/frozenUser';

export async function frozenUsersMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const existInFrozenList = await model(frozenUser).findOne({ where: { phoneNumber: req.body.phoneNumber } });
  if (existInFrozenList) {
    throw new Unauthorized('Your account is frozen because of not returned umbrellas');
  }
  return next();
}
