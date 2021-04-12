import { CronJob } from 'cron';
import * as dayjs from 'dayjs';
import { scheduleConfig } from '../config/cron';
import { model } from '../helpers/db/repository';
import { SeekerRequest } from '../models/SeekerRequest';
import { User } from '../models/User';
import { frozenUser } from '../models/frozenUser';
import { emitToUser } from '../socket/socketServer';

const checkNotReturnedUmbrellas = new CronJob(scheduleConfig.checkNotReturnedUmbrellas, async () => {
  const requests = await model(SeekerRequest).find({ where: { intention: 'lend' } });

  const expiredRequests = requests.filter((request) => {
    return dayjs().isAfter(request.acceptedAt);
  });

  const usersToFreeze = expiredRequests.filter(async (request) => {
    const { strikes } = await model(User).findOne({ where: { id: request.seekerId } });
    await model(User).update({ id: request.seekerId }, { strikes: strikes + 1 });
    return strikes >= 1;
  });

  usersToFreeze.map(async (request) => {
    await model(frozenUser).save({ id: request.seekerId });
  });
}, null, true, 'America/Los_Angeles');

const deleteUnfinishedEscortRequests = new CronJob(scheduleConfig.deleteUnfinishedEscortRequests, async () => {
  const requests = await model(SeekerRequest).find({ where: { intention: 'escort' } });

  const expiredRequests = requests.filter((request) => {
    return dayjs().isAfter(request.acceptedAt);
  });

  expiredRequests.map(async (request) => {
    await model(SeekerRequest).delete({ id: request.seekerId });
  });
}, null, true, 'America/Los_Angeles');

const seekerReminder = new CronJob(scheduleConfig.seekerReminder, async () => {
  const requests = await model(SeekerRequest).find({ where: { intention: 'lend' } });

  requests.map(async (request) => {
    await emitToUser(request.seekerId, 'user.remind', 'Please don`t forget to return umbrella');
  });
}, null, true, 'America/Los_Angeles');

export {
  checkNotReturnedUmbrellas,
  deleteUnfinishedEscortRequests,
  seekerReminder,
};
