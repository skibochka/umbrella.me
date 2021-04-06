import * as express from 'express';
import * as eah from 'express-async-handler';
import { authMiddleware } from '../middlewares/authMiddleware';

const viewsRouter = express.Router();

viewsRouter.get('/sign-up', eah((req:express.Request, res: express.Response) => {
  res.render('sign-up');
}));

viewsRouter.get('/sign-in', eah((req:express.Request, res: express.Response) => {
  res.render('sign-in');
}));

// viewsRouter.use(eah(authMiddleware));

viewsRouter.get('/', eah((req:express.Request, res: express.Response) => {
  res.render('index');
}));

export default viewsRouter;
