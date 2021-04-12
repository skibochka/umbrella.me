import * as express from 'express';
import { BadRequest } from 'http-errors';
import * as dayjs from 'dayjs';
import { User } from '../models/User';
import { model } from '../helpers/db/repository';
import { SeekerRequest } from '../models/SeekerRequest';
import { emitToUser } from '../socket/socketServer';

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

  await emitToUser(req.body.volunteerId, 'request.new', request.id);

  return res.status(200).json({
    request,
  });
}

async function acceptRequest(req: express.Request, res: express.Response) {
  const request = await model(SeekerRequest).findOne({ where: { id: req.body.requestId } });
  if (!request) {
    throw new BadRequest('Such request does not exist');
  }
  if (req.user.id !== request.volunteerId) {
    throw new BadRequest('You can`t accept other user`s requests');
  }
  if (request.acceptedAt) {
    throw new BadRequest('Request is already accepted');
  }

  await model(SeekerRequest).update({ id: request.id }, { acceptedAt: dayjs().add(7, 'days') });

  if (request.intention === 'lend') {
    const seeker = await model(User).findOne({ where: { id: request.seekerId } });
    await emitToUser(request.seekerId, 'request.accepted', {
      requestId: request.id,
      volunteerNumber: req.user.phoneNumber,
    });

    return res.status(200).json({
      msg: 'Request accepted',
      seekerPhoneNumber: seeker.phoneNumber,
    });
  }

  await emitToUser(request.seekerId, 'request.accepted', request.id);

  return res.status(200).json({
    msg: 'Request accepted',
  });
}

async function finishRequest(req: express.Request, res: express.Response) {
  const request = await model(SeekerRequest).findOne({ where: { id: req.body.requestId } });

  if (!request) {
    throw new BadRequest('Such request does not exist');
  }
  if (req.user.id !== request.volunteerId) {
    throw new BadRequest('You can`t finish other user`s requests');
  }
  if (!request.acceptedAt) {
    throw new BadRequest('Request was not accepted');
  }

  await model(SeekerRequest).delete({ id: req.body.requestId });

  await emitToUser(request.seekerId, 'request.finish', {
    requestId: request.id,
  });

  return res.status(200).json({
    msq: 'Request successful finished',
    requestId: request.id,
  });
}

export {
  changeStatus,
  changeRole,
  sendRequest,
  acceptRequest,
  finishRequest,
};
