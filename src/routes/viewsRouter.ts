import * as express from 'express';
import * as eah from 'express-async-handler';
import { httpAuthMiddleware } from '../middlewares/httpAuthMiddleware';

const viewsRouter = express.Router();

viewsRouter.get('/sign-up', eah((req:express.Request, res: express.Response) => {
  res.render('sign-up');
}));

viewsRouter.get('/sign-in', eah((req:express.Request, res: express.Response) => {
  res.render('sign-in');
}));

// viewsRouter.use(eah(httpAuthMiddleware));

viewsRouter.get('/', eah((req:express.Request, res: express.Response) => {
  res.render('index');
}));

export default viewsRouter;
