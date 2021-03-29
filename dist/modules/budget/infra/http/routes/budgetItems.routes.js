"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _BudgetItemController = _interopRequireDefault(require("../controllers/BudgetItemController"));

var _BudgetItemConfirmController = _interopRequireDefault(require("../controllers/BudgetItemConfirmController"));

var _BudgetItemCancelController = _interopRequireDefault(require("../controllers/BudgetItemCancelController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const budgetItemsRouter = (0, _express.Router)();
const budgetsItemsController = new _BudgetItemController.default();
const budgetItemConfirmController = new _BudgetItemConfirmController.default();
const budgetItemCancelController = new _BudgetItemCancelController.default();
budgetItemsRouter.use(_ensureAuthenticated.default);
budgetItemsRouter.get('/:id/itens', budgetsItemsController.index);
budgetItemsRouter.put('/itens/confirmar/:id', budgetItemConfirmController.update);
budgetItemsRouter.put('/itens/cancelar/:id', budgetItemCancelController.update);
var _default = budgetItemsRouter;
exports.default = _default;