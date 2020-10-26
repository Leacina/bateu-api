import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import UserController from '../controllers/UserController';

const usersRouter = Router();

const userController = new UserController();

usersRouter.use(ensureAuthenticated);

usersRouter.post('/', userController.create);

export default usersRouter;
