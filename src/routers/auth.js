import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';

import * as authControllers from '../controllers/auth.js';

import {
  authRegisterSchema,
  authLoginSchema,
  requestResetEmailSchema,
  requestResetPasswordSchema,
} from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(authRegisterSchema),
  ctrlWrapper(authControllers.registerController),
);

authRouter.post(
  '/login',
  validateBody(authLoginSchema),
  ctrlWrapper(authControllers.loginController),
);

authRouter.post(
  '/refresh',
  ctrlWrapper(authControllers.refreshTokenController),
);

authRouter.post('/logout', ctrlWrapper(authControllers.logoutController));

authRouter.get(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(authControllers.requestResetEmailController),
);

authRouter.post(
  '/reset-pwd',
  validateBody(requestResetPasswordSchema),
  ctrlWrapper(authControllers.resetPasswordController),
);

export default authRouter;
