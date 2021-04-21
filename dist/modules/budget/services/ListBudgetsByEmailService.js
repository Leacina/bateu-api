"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IUserRepository = _interopRequireDefault(require("../../users/repositories/IUserRepository"));

var _IBudgetsRepository = _interopRequireDefault(require("../repositories/IBudgetsRepository"));

var _IBudgetItemsRepository = _interopRequireDefault(require("../repositories/IBudgetItemsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListBudgetsByEmailService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('BudgetsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('BudgetItemsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IBudgetsRepository.default === "undefined" ? Object : _IBudgetsRepository.default, typeof _IBudgetItemsRepository.default === "undefined" ? Object : _IBudgetItemsRepository.default, typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ListBudgetsByEmailService {
  constructor(budgetsRepository, budgetItemsRepository, usersRepository) {
    this.budgetsRepository = budgetsRepository;
    this.budgetItemsRepository = budgetItemsRepository;
    this.usersRepository = usersRepository;
  }

  async execute(budget_email, user_id, filter) {
    const {
      id_conta,
      id_estabelecimento,
      id_loja
    } = await this.usersRepository.findById(user_id);
    const budgets = await this.budgetsRepository.findByEmail(budget_email, {
      id_conta,
      id_estabelecimento,
      id_loja
    }, filter); // eslint-disable-next-line no-plusplus

    for (let i = 0; i < budgets.length; i++) {
      if (budgets[i].situacao === 'P') {
        budgets[i].situacao = 'Pendente';
      } else if (budgets[i].situacao === 'VP') {
        budgets[i].situacao = 'Venda Parcial';
      } else if (budgets[i].situacao === 'VI') {
        budgets[i].situacao = 'Venda Integral';
      } else if (budgets[i].situacao === 'C') {
        budgets[i].situacao = 'Cancelado';
      } // eslint-disable-next-line no-await-in-loop


      budgets[i].valor_total = await this.budgetItemsRepository.sum(budgets[i].id);
    }

    return budgets;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = ListBudgetsByEmailService;