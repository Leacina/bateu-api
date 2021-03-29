"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _BudgetController = _interopRequireDefault(require("../controllers/BudgetController"));

var _BudgetByEmailController = _interopRequireDefault(require("../controllers/BudgetByEmailController"));

var _BudgetConfirmController = _interopRequireDefault(require("../controllers/BudgetConfirmController"));

var _BudgetCancelController = _interopRequireDefault(require("../controllers/BudgetCancelController"));

var _budgetItems = _interopRequireDefault(require("./budgetItems.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const budgetsRouter = (0, _express.Router)();
const budgetsController = new _BudgetController.default();
const budgetByEmailController = new _BudgetByEmailController.default();
const budgetConfirmController = new _BudgetConfirmController.default();
const budgetCancelController = new _BudgetCancelController.default();
budgetsRouter.use(_ensureAuthenticated.default);
budgetsRouter.use('/', _budgetItems.default);
budgetsRouter.post('/', budgetsController.create);
budgetsRouter.get('/', budgetsController.show);
budgetsRouter.get('/:id', budgetsController.index);
budgetsRouter.get('/email/:email', budgetByEmailController.index);
budgetsRouter.put('/confirmar/:id', budgetConfirmController.update);
budgetsRouter.put('/cancelar/:id', budgetCancelController.update);
var _default = budgetsRouter;
exports.default = _default;