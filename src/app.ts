import * as express from 'express';
import 'dotenv/config';
import * as fileUpload from 'express-fileupload';
import { createConnection } from 'typeorm';
import morgan = require('morgan');
import clientRouter from './routes/clientRouter';
import authRouter from './routes/authRouter';
import { checkNotReturnedUmbrellas, deleteUnfinishedEscortRequests, seekerReminder } from './jobs/cronJob';
import viewsRouter from './routes/viewsRouter';
import bodyParser = require('body-parser');
import helmet = require('helmet');
import cors = require('cors');

export const appPromise = (async (): Promise<express.Application> => {
  const app = express();

  await createConnection();

  // app.use(helmet());
  // app.use(cors());
  app.use(bodyParser.json({
    inflate: true,
  }));
  app.use(fileUpload());
  app.use(morgan('combined'));
  app.set('views', 'src/public/views');
  app.set('view engine', 'ejs');

  app.use('/', viewsRouter);
  app.use('/auth', authRouter);
  app.use('/', clientRouter);


  app.use((req: express.Request, res: express.Response, next:express.NextFunction) => {
    return res.status(404).send({
      message: `Route ${req.url} not found`,
    });
  });

  app.use((err: express.ErrorRequestHandler, req: express.Request, res: express.Response, next:express.NextFunction) => {
    return res.status(500).send({ error: err });
  });

  checkNotReturnedUmbrellas.start();
  deleteUnfinishedEscortRequests.start();
  seekerReminder.start();

  return app;
});
