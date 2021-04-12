import * as io from 'socket.io';
import { Client } from './socketListeners';
import redisConnection from '../redis/redisConnection';

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
  const redis = redisConnection();
  const userSocket = await redis.get(userId);

  ioServer.to(userSocket).emit(event, value);
}
