"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IUserRepository = _interopRequireDefault(require("../../users/repositories/IUserRepository"));

var _IBudgetsRepository = _interopRequireDefault(require("../repositories/IBudgetsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListBudgetsByIdService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('BudgetsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IBudgetsRepository.default === "undefined" ? Object : _IBudgetsRepository.default, typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListBudgetsByIdService {
  constructor(budgetsRepository, usersRepository) {
    this.budgetsRepository = budgetsRepository;
    this.usersRepository = usersRepository;
  }

  async execute(id, user_id) {
    const {
      id_conta,
      id_estabelecimento,
      id_loja
    } = await this.usersRepository.findById(user_id);
    const budgets = await this.budgetsRepository.findById(id, {
      id_conta,
      id_estabelecimento,
      id_loja
    });

    if (budgets.situacao === 'P') {
      budgets.situacao = 'Pendente';
    } else if (budgets.situacao === 'VP') {
      budgets.situacao = 'Venda Parcial';
    } else if (budgets.situacao === 'VI') {
      budgets.situacao = 'Venda Integral';
    } else if (budgets.situacao === 'C') {
      budgets.situacao = 'Cancelado';
    }

    return budgets;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = ListBudgetsByIdService;