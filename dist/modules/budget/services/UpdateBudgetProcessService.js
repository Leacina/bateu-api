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

let UpdateBudgetProcessService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('BudgetsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IBudgetsRepository.default === "undefined" ? Object : _IBudgetsRepository.default, typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateBudgetProcessService {
  constructor(budgetsRepository, usersRepository) {
    this.budgetsRepository = budgetsRepository;
    this.usersRepository = usersRepository;
  }

  async execute({
    budget_id,
    isConfirm
  }, user_id) {
    const {
      id_conta,
      id_estabelecimento,
      id_loja
    } = await this.usersRepository.findById(user_id);
    const budget = await this.budgetsRepository.process({
      budget_id,
      isConfirm
    }, {
      id_conta,
      id_estabelecimento,
      id_loja
    });
    return budget;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = UpdateBudgetProcessService;