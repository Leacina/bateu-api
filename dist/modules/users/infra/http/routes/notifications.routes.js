"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

var _NotificationBudgetController = _interopRequireDefault(require("../controllers/notification/NotificationBudgetController"));

var _NotificationQuotationController = _interopRequireDefault(require("../controllers/notification/NotificationQuotationController"));

var _NotificationController = _interopRequireDefault(require("../controllers/notification/NotificationController"));

var _NotificationUserViewedController = _interopRequireDefault(require("../controllers/notification/NotificationUserViewedController"));

var _ActivateOrDisableNotificationController = _interopRequireDefault(require("../controllers/notification/ActivateOrDisableNotificationController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const notificationsRoutes = (0, _express.Router)();
const notificationBudgetController = new _NotificationBudgetController.default();
const notificationQuotationController = new _NotificationQuotationController.default();
const notificationController = new _NotificationController.default();
const notificationUserViewedController = new _NotificationUserViewedController.default();
const activateOrDisableNotificationController = new _ActivateOrDisableNotificationController.default();
notificationsRoutes.use(_ensureAuthenticated.default);
notificationsRoutes.post('/', notificationController.create);
notificationsRoutes.post('/serviceworker', activateOrDisableNotificationController.create);
notificationsRoutes.get('/', notificationController.show);
notificationsRoutes.get('/:id', notificationController.index);
notificationsRoutes.post('/visualizado/:id', notificationUserViewedController.create);
notificationsRoutes.get('/budget/:id', notificationBudgetController.delete);
notificationsRoutes.get('/quotation/:id', notificationQuotationController.delete);
var _default = notificationsRoutes;
exports.default = _default;