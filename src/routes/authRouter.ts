import * as express from 'express';
import * as eah from 'express-async-handler';
import { authValidation } from '../validation/authSchemas';
import { httpAuthMiddleware } from '../middlewares/httpAuthMiddleware';
import { signUp, signIn, signOut } from '../controllers/authController';
import { validatorMiddleware } from '../middlewares/validatorMiddleware';
import { frozenUsersMiddleware } from '../middlewares/frozenUsersMiddleware';

const authRouter = express.Router();


authRouter.post('/sign-up', validatorMiddleware(authValidation.signUp), eah(frozenUsersMiddleware), eah(signUp));

authRouter.post('/sign-in', validatorMiddleware(authValidation.signIn), eah(signIn));

authRouter.use(eah(httpAuthMiddleware));

authRouter.post('/sign-out', validatorMiddleware(authValidation.signOut), eah(signOut));

export default authRouter;
