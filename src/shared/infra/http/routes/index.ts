// src/routes/index.ts
import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import establishmentsRouter from '@modules/establishment/infra/http/routes/establishment.routes';
import shopsRouter from '@modules/establishment/infra/http/routes/shop.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import accountsRouter from '@modules/users/infra/http/routes/accounts.routes';
import brandsRouter from '@modules/piece/infra/http/routes/brands.routes';
import modelsRouter from '@modules/piece/infra/http/routes/models.routes';
import categoriesRouter from '@modules/piece/infra/http/routes/categories.routes';
import piecesRouter from '@modules/piece/infra/http/routes/pieces.routes';
import budgetsRouter from '@modules/budget/infra/http/routes/budget.routes';
import quotationsRouter from '@modules/quotation/infra/http/routes/quotation.routes';

const routes = Router();

routes.use('/api/usuario', usersRouter);
routes.use('/api/estabelecimento', establishmentsRouter);
routes.use('/api/loja', shopsRouter);
routes.use('/api/signin', sessionsRouter);
routes.use('/api/conta', accountsRouter);
routes.use('/api/marca', brandsRouter);
routes.use('/api/modelo', modelsRouter);
routes.use('/api/categoria', categoriesRouter);
routes.use('/api/peca', piecesRouter);
routes.use('/api/orcamento', budgetsRouter);
routes.use('/api/cotacao', quotationsRouter);

export default routes;
