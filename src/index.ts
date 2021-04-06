import * as io from 'socket.io';
import { appPromise } from './app';
import { appConfiguration } from './config/app';
import { Client } from './controllers/clientController';

appPromise().then((app) => {
  const serverInstance = app.listen(appConfiguration.port, () => {
    console.log(`server is up and running on port ${appConfiguration.port}`);
  });
  const ioServer = new io.Server(serverInstance);

  ioServer.on('connection', async (socket) => {
    await Client.build(socket);
  });
  return serverInstance;
});
