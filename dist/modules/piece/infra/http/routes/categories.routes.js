"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _CategoriesController = _interopRequireDefault(require("../controllers/CategoriesController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const categoriesRouter = (0, _express.Router)();
const categoriesController = new _CategoriesController.default();
categoriesRouter.use(_ensureAuthenticated.default);
categoriesRouter.post('/', categoriesController.create);
categoriesRouter.get('/', categoriesController.show);
categoriesRouter.get('/:id', categoriesController.index);
categoriesRouter.put('/:id', categoriesController.update);
categoriesRouter.delete('/:id', categoriesController.delete);
var _default = categoriesRouter;
exports.default = _default;