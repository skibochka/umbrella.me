import { appPromise } from './app';
import { appConfiguration } from './config/app';
import { socketServer } from './socket/socketServer';

appPromise().then(async (app) => {
  const serverInstance = app.listen(appConfiguration.port, () => {
    console.log(`server is up and running on port ${appConfiguration.port}`);
  });
  await socketServer(serverInstance);
  return serverInstance;
});
