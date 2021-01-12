import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import QuotationController from '../controllers/QuotationController';
import budgetItemsRouter from './quotationItems.routes';

const quotationsRouter = Router();

const quotationController = new QuotationController();

quotationsRouter.use(ensureAuthenticated);
quotationsRouter.use('/', budgetItemsRouter);
quotationsRouter.post('/', quotationController.create);
quotationsRouter.get('/', quotationController.show);

export default quotationsRouter;
