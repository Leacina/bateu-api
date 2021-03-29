"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _EstablishmentController = _interopRequireDefault(require("../controllers/EstablishmentController"));

var _EstablishmentByAccountController = _interopRequireDefault(require("../controllers/EstablishmentByAccountController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const establishmentsRouter = (0, _express.Router)();
const establishmentsController = new _EstablishmentController.default();
const establishmentsAccountController = new _EstablishmentByAccountController.default();
establishmentsRouter.use(_ensureAuthenticated.default);
establishmentsRouter.get('/:id', establishmentsController.index);
establishmentsRouter.post('/', establishmentsController.create);
establishmentsRouter.get('/', establishmentsController.show);
establishmentsRouter.put('/:id', establishmentsController.update);
establishmentsRouter.get('/conta/:id', establishmentsAccountController.show);
var _default = establishmentsRouter;
exports.default = _default;