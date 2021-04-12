import { Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user.interface';
import jwtConfig from '../config/jwt';
import { model } from '../helpers/db/repository';
import { User } from '../models/User';
import { socketAuthMiddleware } from '../middlewares/socketAuthMiddleware';
import { redisConfiguration } from '../config/redis';
import redisConnection from '../redis/redisConnection';

export class Client {
  constructor(socket: Socket, user :IUser) {
    this.user = user;

    this.socket = socket;
    this.socket.use((ioSocket, next) => socketAuthMiddleware(socket, next));
    this.socket.on('push.my.location', (location) => this.pushMyLocation(location));
    this.socket.on('get.users.locations', () => this.getUsersLocation());
  }

  private socket: Socket;

  private readonly user: IUser;

  static async build(socket) {
    try {
      const {
        phoneNumber, name, role, id,
      } = jwt.verify(socket.handshake.auth.token, jwtConfig.secret);
      const redis = redisConnection();
      await redis.set(id, socket.id, 'EX', redisConfiguration.accessExpirationTime);
      return new this(socket, {
        phoneNumber, name, role, id,
      });
    } catch (error) {
      throw new Error(error.details);
    }
  }

  private async pushMyLocation(location) {
    await model(User).update(this.user.id, { location });
  }

  private async getUsersLocation() {
    if (this.user.role === 'volunteer' && 'stationaryVolunteer') {
      const seekerLocations = await model(User).find({ select: ['location'], where: { role: 'seeker', status: true } });

      return this.socket.emit('users.get.locations', seekerLocations);
    }
    const volunteerLocations = await model(User).find({ select: ['location'], where: [{ role: 'stationaryVolunteer' }, { role: 'volunteer' }] });
    return this.socket.emit('users.get.locations', volunteerLocations);
  }
}
