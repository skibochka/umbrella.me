import * as io from 'socket.io';
import { Client } from './socketListeners';

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
  ioServer.to(userId).emit(event, value);
}
