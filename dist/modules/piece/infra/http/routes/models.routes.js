"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _ModelsController = _interopRequireDefault(require("../controllers/ModelsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const modelsRouter = (0, _express.Router)();
const modelsController = new _ModelsController.default();
modelsRouter.use(_ensureAuthenticated.default);
modelsRouter.post('/', modelsController.create);
modelsRouter.get('/', modelsController.show);
modelsRouter.get('/:id', modelsController.index);
modelsRouter.put('/:id', modelsController.update);
modelsRouter.delete('/:id', modelsController.delete);
var _default = modelsRouter;
exports.default = _default;