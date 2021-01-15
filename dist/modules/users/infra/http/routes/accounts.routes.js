"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _AccountController = _interopRequireDefault(require("../controllers/AccountController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const accountsRouter = (0, _express.Router)();
const accountsController = new _AccountController.default();
accountsRouter.post('/', accountsController.create);
accountsRouter.get('/:id', accountsController.index);
var _default = accountsRouter;
exports.default = _default;