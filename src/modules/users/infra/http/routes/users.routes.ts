import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UserController from '../controllers/UserController';
import UserClientController from '../controllers/UserClientController';
import UserActivateController from '../controllers/UserActivateController';
import UserDisableController from '../controllers/UserDisableController';

const usersRouter = Router();

const userController = new UserController();
const userClientController = new UserClientController();
const userActivateController = new UserActivateController();
const userDisableController = new UserDisableController();

usersRouter.use(ensureAuthenticated);

usersRouter.post('/', userController.create);
usersRouter.put('/:id', userController.update);
usersRouter.get('/todos/:id', userController.index);
usersRouter.get('/logista', userController.show);
usersRouter.get('/cliente', userClientController.show);

usersRouter.put('/ativar/:id', userActivateController.update);
usersRouter.put('/desativar/:id', userDisableController.update);

export default usersRouter;
