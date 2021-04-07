import * as express from 'express';
import * as eah from 'express-async-handler';
import { httpAuthMiddleware } from '../middlewares/httpAuthMiddleware';
import { statusActivate, statusInactivate, changeRole } from '../controllers/httpClientController';

const clientRouter = express.Router();

clientRouter.use(eah(httpAuthMiddleware));

clientRouter.patch('/status/activate', eah(statusActivate));

clientRouter.patch('/status/inactivate', eah(statusInactivate));

clientRouter.patch('/role/change', eah(changeRole));

export default clientRouter;
