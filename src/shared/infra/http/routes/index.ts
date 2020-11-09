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

const routes = Router();

routes.use('/usuario', usersRouter);
routes.use('/estabelecimento', establishmentsRouter);
routes.use('/loja', shopsRouter);
routes.use('/login', sessionsRouter);
routes.use('/conta', accountsRouter);
routes.use('/marca', brandsRouter);
routes.use('/modelo', modelsRouter);
routes.use('/categoria', categoriesRouter);
routes.use('/peca', piecesRouter);

export default routes;
