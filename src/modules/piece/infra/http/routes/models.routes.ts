import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ModelsController from '../controllers/ModelsController';

const modelsRouter = Router();
const modelsController = new ModelsController();

modelsRouter.use(ensureAuthenticated);
modelsRouter.post('/', modelsController.create);
modelsRouter.get('/', modelsController.show);
modelsRouter.get('/:id', modelsController.index);
modelsRouter.put('/:id', modelsController.update);
modelsRouter.delete('/:id', modelsController.delete);

export default modelsRouter;
