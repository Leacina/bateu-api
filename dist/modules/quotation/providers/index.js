"use strict";

var _tsyringe = require("tsyringe");

var _QuotationItemsRepository = _interopRequireDefault(require("../infra/typeorm/repositories/QuotationItemsRepository"));

var _QuotationsRepository = _interopRequireDefault(require("../infra/typeorm/repositories/QuotationsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Injeção de dependências
 */
_tsyringe.container.registerSingleton('QuotationItemsRepository', _QuotationItemsRepository.default);

_tsyringe.container.registerSingleton('QuotationsRepository', _QuotationsRepository.default);