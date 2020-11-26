import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PiecesController from '../controllers/PiecesController';
import PiecesByEstablishmentController from '../controllers/PiecesByEstablishmentController';
import PiecesByShopController from '../controllers/PiecesByShopController';
import PiecesByCategoryController from '../controllers/PiecesByCategoryController';

const piecesRouter = Router();
const piecesController = new PiecesController();
const piecesByEstablishmentController = new PiecesByEstablishmentController();
const piecesByShopController = new PiecesByShopController();
const piecesByCategoryController = new PiecesByCategoryController();

// piecesRouter.use(ensureAuthenticated);
piecesRouter.post('/', piecesController.create);
piecesRouter.get('/', piecesController.show);
piecesRouter.get('/:id', piecesController.index);
piecesRouter.put('/:id', piecesController.update);
piecesRouter.delete('/:id', piecesController.delete);
piecesRouter.get('/estabelecimento/:id', piecesByEstablishmentController.show);
piecesRouter.get('/estabelecimento/loja/:id', piecesByShopController.show);
piecesRouter.get('/categoria/:id', piecesByCategoryController.show);

export default piecesRouter;
