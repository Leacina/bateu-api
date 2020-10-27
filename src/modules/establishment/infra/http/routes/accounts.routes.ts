import { Router } from 'express';

import AccountsController from '../controllers/EstablishmentController';

const accountsRouter = Router();

const accountsController = new AccountsController();

accountsRouter.post('/', accountsController.create);

export default appointmentsRouter;
