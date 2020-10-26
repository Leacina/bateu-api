import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AccountsController from '../controllers/AccountController';

const accountsRouter = Router();

const accountsController = new AccountsController();

accountsRouter.use(ensureAuthenticated);

accountsRouter.post('/', accountsController.create);

export default appointmentsRouter;
