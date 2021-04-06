import { Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user.interface';
import jwtConfig from '../config/jwt';
import { model } from '../helpers/db/repository';
import { User } from '../models/User';

export class Client {
  constructor(socket: Socket, user :IUser) {
    this.user = user;

    this.socket = socket;
    this.socket.on('status.active', () => this.changeStatusOnActive());
    this.socket.on('status.inactive', () => this.changeStatusOnInactive());
  }

  private socket: Socket;

  private readonly user: IUser;

  static async build(socket) {
    try {
      const {
        phoneNumber, name, role, id,
      } = jwt.verify(socket.handshake.query.token, jwtConfig.secret);
      return new this(socket, {
        phoneNumber, name, role, id,
      });
    } catch (error) {
      throw new Error(error.details);
    }
  }

  private async changeStatusOnActive() {
    await model(User).update(this.user.id, { status: true });
    return this.socket.emit('status.active', { status: true });
  }

  private async changeStatusOnInactive() {
    await model(User).update(this.user.id, { status: false });
    return this.socket.emit('status.inactive', { status: false });
  }
}
