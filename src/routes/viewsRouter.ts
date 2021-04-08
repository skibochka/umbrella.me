import * as express from 'express';
import * as eah from 'express-async-handler';

const viewsRouter = express.Router();

viewsRouter.get('/sign-up', eah((req:express.Request, res: express.Response) => {
  return res.render('sign-up');
}));

viewsRouter.get('/sign-in', eah((req:express.Request, res: express.Response) => {
  return res.render('sign-in');
}));

viewsRouter.get('/', eah((req:express.Request, res: express.Response) => {
  return res.render('index');
}));

export default viewsRouter;
