"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _BrandsController = _interopRequireDefault(require("../controllers/BrandsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const brandsRouter = (0, _express.Router)();
const brandsController = new _BrandsController.default();
brandsRouter.use(_ensureAuthenticated.default);
brandsRouter.post('/', brandsController.create);
brandsRouter.get('/', brandsController.show);
brandsRouter.get('/:id', brandsController.index);
brandsRouter.put('/:id', brandsController.update);
brandsRouter.delete('/:id', brandsController.delete);
var _default = brandsRouter;
exports.default = _default;