import { Router } from 'express';

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import QuotationController from '../controllers/QuotationController';
import budgetItemsRouter from './quotationItems.routes';

const quotationsRouter = Router();

const quotationController = new QuotationController();

// budgetsRouter.use(ensureAuthenticated);
quotationsRouter.use('/', budgetItemsRouter);
quotationsRouter.get('/', quotationController.show);

export default quotationsRouter;
