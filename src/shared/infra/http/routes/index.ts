// src/routes/index.ts
import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import establishmentsRouter from '@modules/establishment/infra/http/routes/establishment.routes';
import shopsRouter from '@modules/establishment/infra/http/routes/shop.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import accountRouter from '@modules/users/infra/http/routes/accounts.routes';

const routes = Router();

routes.use('/usuario', usersRouter);
routes.use('/estabelecimento', establishmentsRouter);
routes.use('/loja', shopsRouter);
routes.use('/login', sessionsRouter);
routes.use('/conta', accountRouter);

export default routes;
