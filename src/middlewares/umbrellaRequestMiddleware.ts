import * as express from 'express';
import { BadRequest } from 'http-errors';
import { model } from '../helpers/db/repository';
import { User } from '../models/User';

export async function umbrellaRequestMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.user.role !== 'seeker') {
    throw new BadRequest('You can`t send requests as volunteer');
  }

  const volunteer = await model(User).findOne({ where: { id: req.body.volunteerId } });

  if (!volunteer) {
    throw new BadRequest('No such volunteer');
  }
  if (volunteer.role !== 'volunteer' && volunteer.role !== 'stationaryVolunteer') {
    throw new BadRequest('No such volunteer');
  }
  if (volunteer.role === 'stationaryVolunteer' && req.body.intention === 'escort') {
    throw new BadRequest('You can`t send escort request to stationary volunteer');
  }


  return next();
}
