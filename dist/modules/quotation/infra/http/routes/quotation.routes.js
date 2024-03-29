"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _QuotationController = _interopRequireDefault(require("../controllers/QuotationController"));

var _QuotationByEmailController = _interopRequireDefault(require("../controllers/QuotationByEmailController"));

var _QuotationProcessViewController = _interopRequireDefault(require("../controllers/QuotationProcessViewController"));

var _quotationItems = _interopRequireDefault(require("./quotationItems.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const quotationsRouter = (0, _express.Router)();
const quotationController = new _QuotationController.default();
const quotationByEmailController = new _QuotationByEmailController.default();
const quotationProcessViewController = new _QuotationProcessViewController.default();
quotationsRouter.use(_ensureAuthenticated.default);
quotationsRouter.use('/', _quotationItems.default);
quotationsRouter.post('/', quotationController.create);
quotationsRouter.get('/', quotationController.show);
quotationsRouter.get('/email/:email', quotationByEmailController.show);
quotationsRouter.put('/visualizado/:id/:view', quotationProcessViewController.create);
var _default = quotationsRouter;
exports.default = _default;