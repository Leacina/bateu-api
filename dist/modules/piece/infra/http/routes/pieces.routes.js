"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _uploadImagePiece = _interopRequireDefault(require("../../../../../config/uploadImagePiece"));

var _PiecesController = _interopRequireDefault(require("../controllers/PiecesController"));

var _PieceUnionFilterController = _interopRequireDefault(require("../controllers/PieceUnionFilterController"));

var _PiecesSpotlightController = _interopRequireDefault(require("../controllers/PiecesSpotlightController"));

var _PiecesByEstablishmentController = _interopRequireDefault(require("../controllers/PiecesByEstablishmentController"));

var _PiecesByShopController = _interopRequireDefault(require("../controllers/PiecesByShopController"));

var _PiecesByCategoryController = _interopRequireDefault(require("../controllers/PiecesByCategoryController"));

var _ImagePieceController = _interopRequireDefault(require("../controllers/ImagePieceController"));

var _TypesPieceController = _interopRequireDefault(require("../controllers/TypesPieceController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const upload = (0, _multer.default)(_uploadImagePiece.default);
const piecesRouter = (0, _express.Router)();
const piecesController = new _PiecesController.default();
const piecesByEstablishmentController = new _PiecesByEstablishmentController.default();
const piecesByShopController = new _PiecesByShopController.default();
const piecesByCategoryController = new _PiecesByCategoryController.default();
const imagePieceController = new _ImagePieceController.default();
const piecesSpotlightController = new _PiecesSpotlightController.default();
const typesPieceController = new _TypesPieceController.default();
const pieceUnionFilterController = new _PieceUnionFilterController.default();
piecesRouter.get('/imagem/:filename', imagePieceController.index);
piecesRouter.use(_ensureAuthenticated.default);
piecesRouter.post('/:id/imagens', upload.any(), imagePieceController.create);
piecesRouter.get('/:id/imagens', imagePieceController.show);
piecesRouter.get('/tipos', typesPieceController.index);
piecesRouter.get('/destaque', piecesSpotlightController.show);
piecesRouter.put('/destaque/:id/:peca_destaque', piecesSpotlightController.update);
piecesRouter.post('/', piecesController.create);
piecesRouter.put('/:id', piecesController.update);
piecesRouter.get('/', piecesController.show);
piecesRouter.get('/union', pieceUnionFilterController.show);
piecesRouter.get('/:id', piecesController.index);
piecesRouter.delete('/:id', piecesController.delete);
piecesRouter.get('/estabelecimento/:id', piecesByEstablishmentController.show);
piecesRouter.get('/estabelecimento/loja/:id', piecesByShopController.show);
piecesRouter.get('/categoria/:id', piecesByCategoryController.show);
piecesRouter.get('/categoria/todas/:id/:cidade', piecesByCategoryController.show);
piecesRouter.get('/categoria/todas/:id/:cidade', piecesByCategoryController.show);
var _default = piecesRouter;
exports.default = _default;