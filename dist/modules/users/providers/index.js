"use strict";

var _tsyringe = require("tsyringe");

var _UsersRepository = _interopRequireDefault(require("../infra/typeorm/repositories/UsersRepository"));

var _UserLegalInfoRepository = _interopRequireDefault(require("../infra/typeorm/repositories/UserLegalInfoRepository"));

var _AccountsRepository = _interopRequireDefault(require("../infra/typeorm/repositories/AccountsRepository"));

var _BCryptHashProvider = _interopRequireDefault(require("./HashProvider/implementations/BCryptHashProvider"));

var _PerfilRepository = _interopRequireDefault(require("../infra/typeorm/repositories/PerfilRepository"));

var _UserTokensRepository = _interopRequireDefault(require("../infra/typeorm/repositories/UserTokensRepository"));

var _NotificationsRepository = _interopRequireDefault(require("../infra/typeorm/repositories/NotificationsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Injeção de dependências
 */
_tsyringe.container.registerSingleton('HashProvider', _BCryptHashProvider.default);

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.default);

_tsyringe.container.registerSingleton('NotificationsRepository', _NotificationsRepository.default);

_tsyringe.container.registerSingleton('UserLegalInfoRepository', _UserLegalInfoRepository.default);

_tsyringe.container.registerSingleton('AccountsRepository', _AccountsRepository.default);

_tsyringe.container.registerSingleton('PerfilRepository', _PerfilRepository.default);

_tsyringe.container.registerSingleton('UserTokensRepository', _UserTokensRepository.default);