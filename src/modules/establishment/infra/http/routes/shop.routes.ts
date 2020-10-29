import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ShopController from '../controllers/ShopController';
import ShopByAccountController from '../controllers/ShopByAccountController';

const shopsRouter = Router();

const shopController = new ShopController();
const shopByAccountController = new ShopByAccountController();

shopsRouter.use(ensureAuthenticated);

shopsRouter.get('/:id', shopController.index);
shopsRouter.post('/', shopController.create);
shopsRouter.get('/conta/:id', shopByAccountController.show);

export default shopsRouter;
