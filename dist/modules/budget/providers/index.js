"use strict";

var _tsyringe = require("tsyringe");

var _BudgetItemsRepository = _interopRequireDefault(require("../infra/typeorm/repositories/BudgetItemsRepository"));

var _BudgetsRepository = _interopRequireDefault(require("../infra/typeorm/repositories/BudgetsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Injeção de dependências
 */
_tsyringe.container.registerSingleton('BudgetItemsRepository', _BudgetItemsRepository.default);

_tsyringe.container.registerSingleton('BudgetsRepository', _BudgetsRepository.default);