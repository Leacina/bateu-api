"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _PerfilController = _interopRequireDefault(require("../controllers/PerfilController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const perfilRouter = (0, _express.Router)();
const perfilController = new _PerfilController.default();
perfilRouter.post('/', perfilController.create);
perfilRouter.get('/', perfilController.show);
perfilRouter.get('/:id', perfilController.index);
perfilRouter.put('/:id', perfilController.update);
var _default = perfilRouter;
exports.default = _default;