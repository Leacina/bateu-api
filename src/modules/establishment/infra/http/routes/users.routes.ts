import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import UserController from '../controllers/ShopController';

const usersRouter = Router();

const userController = new UserController();

usersRouter.use(ensureAuthenticated);

usersRouter.post('/', userController.create);

export default usersRouter;
