"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

var _UserClientController = _interopRequireDefault(require("../controllers/UserClientController"));

var _UserActivateController = _interopRequireDefault(require("../controllers/UserActivateController"));

var _UserDisableController = _interopRequireDefault(require("../controllers/UserDisableController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRouter = (0, _express.Router)();
const userController = new _UserController.default();
const userClientController = new _UserClientController.default();
const userActivateController = new _UserActivateController.default();
const userDisableController = new _UserDisableController.default();
usersRouter.use(_ensureAuthenticated.default);
usersRouter.post('/', userController.create);
usersRouter.put('/:id', userController.update);
usersRouter.get('/todos/:id', userController.index);
usersRouter.get('/logista', userController.show);
usersRouter.get('/cliente', userClientController.show);
usersRouter.put('/ativar/:id', userActivateController.update);
usersRouter.put('/desativar/:id', userDisableController.update);
var _default = usersRouter;
exports.default = _default;