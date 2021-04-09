import * as io from 'socket.io';
import * as Redis from 'ioredis';
import { Client } from './socketListeners';
import { redisConfiguration } from '../config/redis';

let ioServer = null;

export async function socketServer(serverInstance) {
  if (!ioServer) {
    ioServer = new io.Server(serverInstance);

    ioServer.on('connection', async (socket) => {
      await Client.build(socket);
    });
  }
}

export async function emitToUser(userId, event, value) {
  const redis: Redis = new Redis(`redis://${redisConfiguration.redisUrl}:${redisConfiguration.redisPort}`);
  const userSocket = await redis.get(userId);

  ioServer.to(userSocket).emit(event, value);
}
