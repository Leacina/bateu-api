"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _users = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/users.routes"));

var _establishment = _interopRequireDefault(require("../../../../modules/establishment/infra/http/routes/establishment.routes"));

var _shop = _interopRequireDefault(require("../../../../modules/establishment/infra/http/routes/shop.routes"));

var _sessions = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/sessions.routes"));

var _accounts = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/accounts.routes"));

var _perfil = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/perfil.routes"));

var _brands = _interopRequireDefault(require("../../../../modules/piece/infra/http/routes/brands.routes"));

var _models = _interopRequireDefault(require("../../../../modules/piece/infra/http/routes/models.routes"));

var _categories = _interopRequireDefault(require("../../../../modules/piece/infra/http/routes/categories.routes"));

var _pieces = _interopRequireDefault(require("../../../../modules/piece/infra/http/routes/pieces.routes"));

var _budget = _interopRequireDefault(require("../../../../modules/budget/infra/http/routes/budget.routes"));

var _quotation = _interopRequireDefault(require("../../../../modules/quotation/infra/http/routes/quotation.routes"));

var _password = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/password.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// src/routes/index.ts
const routes = (0, _express.Router)();
routes.use('/api/usuario', _users.default);
routes.use('/api/estabelecimento', _establishment.default);
routes.use('/api/loja', _shop.default);
routes.use('/api/signin', _sessions.default);
routes.use('/api/conta', _accounts.default);
routes.use('/api/marca', _brands.default);
routes.use('/api/modelo', _models.default);
routes.use('/api/categoria', _categories.default);
routes.use('/api/peca', _pieces.default);
routes.use('/api/orcamento', _budget.default);
routes.use('/api/cotacao', _quotation.default);
routes.use('/api/perfil', _perfil.default);
routes.use('/api/password', _password.default);
var _default = routes;
exports.default = _default;