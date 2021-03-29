"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _QuotationItemController = _interopRequireDefault(require("../controllers/QuotationItemController"));

var _QuotationItemConfirmController = _interopRequireDefault(require("../controllers/QuotationItemConfirmController"));

var _QuotationItemCancelController = _interopRequireDefault(require("../controllers/QuotationItemCancelController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const quotationItemsRouter = (0, _express.Router)();
const quotationItemController = new _QuotationItemController.default();
const quotationItemConfirmController = new _QuotationItemConfirmController.default();
const quotationItemCancelController = new _QuotationItemCancelController.default();
quotationItemsRouter.use(_ensureAuthenticated.default);
quotationItemsRouter.get('/:id/itens', quotationItemController.index);
quotationItemsRouter.put('/itens/:id', quotationItemController.update);
quotationItemsRouter.put('/itens/confirmar/:id', quotationItemConfirmController.update);
quotationItemsRouter.put('/itens/cancelar/:id', quotationItemCancelController.update);
var _default = quotationItemsRouter;
exports.default = _default;