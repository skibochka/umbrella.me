import * as express from 'express';
import * as eah from 'express-async-handler';
import { httpAuthMiddleware } from '../middlewares/httpAuthMiddleware';
import {
  changeStatus,
  changeRole,
  sendRequest,
  acceptRequest,
} from '../controllers/httpClientController';
import { validatorMiddleware } from '../middlewares/validatorMiddleware';
import { clientValidation } from '../validation/clientSchemas';
import { umbrellaRequestMiddleware } from '../middlewares/umbrellaRequestMiddleware';

const clientRouter = express.Router();

clientRouter.use(eah(httpAuthMiddleware));

clientRouter.patch('/status/change', validatorMiddleware(clientValidation.changeStatus), eah(changeStatus));

clientRouter.patch('/role/change', validatorMiddleware(clientValidation.changeRole), eah(changeRole));

clientRouter.post('/request/send', validatorMiddleware(clientValidation.umbrellaRequest), eah(umbrellaRequestMiddleware), eah(sendRequest));

clientRouter.patch('/request/accept', validatorMiddleware(clientValidation.acceptRequest), eah(acceptRequest));

export default clientRouter;
