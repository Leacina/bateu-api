"use strict";

var _tsyringe = require("tsyringe");

var _UsersRepository = _interopRequireDefault(require("../infra/typeorm/repositories/UsersRepository"));

var _AccountsRepository = _interopRequireDefault(require("../infra/typeorm/repositories/AccountsRepository"));

var _BCryptHashProvider = _interopRequireDefault(require("./HashProvider/implementations/BCryptHashProvider"));

var _PerfilRepository = _interopRequireDefault(require("../infra/typeorm/repositories/PerfilRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Injeção de dependências
 */
_tsyringe.container.registerSingleton('HashProvider', _BCryptHashProvider.default);

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.default);

_tsyringe.container.registerSingleton('AccountsRepository', _AccountsRepository.default);

_tsyringe.container.registerSingleton('PerfilRepository', _PerfilRepository.default);