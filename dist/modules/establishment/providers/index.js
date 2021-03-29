"use strict";

var _tsyringe = require("tsyringe");

var _EstablishmentsRepository = _interopRequireDefault(require("../infra/typeorm/repositories/EstablishmentsRepository"));

var _ShopsRepository = _interopRequireDefault(require("../infra/typeorm/repositories/ShopsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Injeção de dependências
 */
_tsyringe.container.registerSingleton('EstablishmentsRepository', _EstablishmentsRepository.default);

_tsyringe.container.registerSingleton('ShopsRepository', _ShopsRepository.default);