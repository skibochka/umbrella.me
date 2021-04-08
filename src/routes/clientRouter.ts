import * as express from 'express';
import * as eah from 'express-async-handler';
import { httpAuthMiddleware } from '../middlewares/httpAuthMiddleware';
import { changeStatus, changeRole, sendRequest } from '../controllers/httpClientController';
import { validatorMiddleware } from '../middlewares/validatorMiddleware';
import { clientValidation } from '../validation/clientSchemas';
import { umbrellaRequestMiddleware } from '../middlewares/umbrellaRequestMiddleware';

const clientRouter = express.Router();

clientRouter.use(eah(httpAuthMiddleware));

clientRouter.patch('/status/change', validatorMiddleware(clientValidation.changeStatus), eah(changeStatus));

clientRouter.patch('/role/change', eah(changeRole));

clientRouter.post('/umbrella/request', validatorMiddleware(clientValidation.umbrellaRequest), eah(umbrellaRequestMiddleware), eah(sendRequest));

export default clientRouter;
