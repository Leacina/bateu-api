"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IUserRepository = _interopRequireDefault(require("../../users/repositories/IUserRepository"));

var _AppListResponse = _interopRequireDefault(require("../../../shared/utils/implementations/AppListResponse"));

var _IQuotationsRepository = _interopRequireDefault(require("../repositories/IQuotationsRepository"));

var _IQuotationItemsRepository = _interopRequireDefault(require("../repositories/IQuotationItemsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListBudgetsByEmailService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('QuotationsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('QuotationItemsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IQuotationsRepository.default === "undefined" ? Object : _IQuotationsRepository.default, typeof _IQuotationItemsRepository.default === "undefined" ? Object : _IQuotationItemsRepository.default, typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ListBudgetsByEmailService {
  constructor(quotationsRepository, quotationItemsRepository, usersRepository) {
    this.quotationsRepository = quotationsRepository;
    this.quotationItemsRepository = quotationItemsRepository;
    this.usersRepository = usersRepository;
  }

  async execute(budget_email, user_id, filter, isViewAll) {
    const {
      id_conta,
      id_estabelecimento,
      id_loja
    } = await this.usersRepository.findById(user_id);
    const quotations = await this.quotationsRepository.findByEmail(budget_email, {
      id_conta,
      id_estabelecimento,
      id_loja
    }, filter, isViewAll); // eslint-disable-next-line no-plusplus

    for (let i = 0; i < quotations.length; i++) {
      if (quotations[i].situacao === 'P') {
        quotations[i].situacao = 'Pendente';
      } else if (quotations[i].situacao === 'VP') {
        quotations[i].situacao = 'Venda Parcial';
      } else if (quotations[i].situacao === 'VI') {
        quotations[i].situacao = 'Venda Integral';
      } else if (quotations[i].situacao === 'C') {
        quotations[i].situacao = 'Cancelado';
      } // eslint-disable-next-line no-await-in-loop


      quotations[i].valor_total = await this.quotationItemsRepository.sum(quotations[i].id);
    }

    return new _AppListResponse.default(quotations, filter.page, filter.pageSize); // return quotations;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = ListBudgetsByEmailService;