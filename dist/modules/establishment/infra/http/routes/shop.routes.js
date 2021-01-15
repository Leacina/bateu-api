"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _uploadImageShop = _interopRequireDefault(require("../../../../../config/uploadImageShop"));

var _ShopController = _interopRequireDefault(require("../controllers/ShopController"));

var _ShopByEstablishmentController = _interopRequireDefault(require("../controllers/ShopByEstablishmentController"));

var _ImageShopController = _interopRequireDefault(require("../controllers/ImageShopController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const shopsRouter = (0, _express.Router)();
const upload = (0, _multer.default)(_uploadImageShop.default);
const shopController = new _ShopController.default();
const shopByEstablishmentController = new _ShopByEstablishmentController.default();
const imageShopController = new _ImageShopController.default();
shopsRouter.use(_ensureAuthenticated.default);
shopsRouter.get('/imagem/:filename', imageShopController.index);
shopsRouter.post('/:id/imagem', upload.single('file'), imageShopController.create);
shopsRouter.get('/:id', shopController.index);
shopsRouter.post('/', shopController.create);
shopsRouter.get('/', shopController.show);
shopsRouter.put('/:id', shopController.update);
shopsRouter.get('/estabelecimento/:id', shopByEstablishmentController.show);
var _default = shopsRouter;
exports.default = _default;