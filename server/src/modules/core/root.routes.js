import { Router } from 'express';
import { userRouter } from '../platform-users/user.routes.js';

const router = Router();

router.use(userRouter);

export { router as rootRouter };
