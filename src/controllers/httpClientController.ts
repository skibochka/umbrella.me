import * as express from 'express';
import { User } from '../models/User';
import { model } from '../helpers/db/repository';

async function statusActivate(req: express.Request, res: express.Response) {
  await model(User).update(req.user.id, { status: true });

  return res.status(200).json({
    status: true,
  });
}

async function statusInactivate(req: express.Request, res: express.Response) {
  await model(User).update(req.user.id, { status: false });

  return res.status(200).json({
    status: false,
  });
}

async function changeRole(req: express.Request, res: express.Response) {
  await model(User).update(req.user.id, { role: req.body.role });

  return res.status(200).json({
    role: req.body.role,
  });
}

export {
  statusActivate,
  statusInactivate,
  changeRole,
};
