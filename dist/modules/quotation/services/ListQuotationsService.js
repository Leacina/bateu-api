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

let ListQuotationsService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('QuotationsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('QuotationItemsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IQuotationsRepository.default === "undefined" ? Object : _IQuotationsRepository.default, typeof _IQuotationItemsRepository.default === "undefined" ? Object : _IQuotationItemsRepository.default, typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ListQuotationsService {
  constructor(quotationsRepository, quotationItemsRepository, usersRepository) {
    this.quotationsRepository = quotationsRepository;
    this.quotationItemsRepository = quotationItemsRepository;
    this.usersRepository = usersRepository;
  }

  async execute(user_id, filter) {
    const {
      id_conta,
      id_estabelecimento,
      id_loja
    } = await this.usersRepository.findById(user_id);
    const quotations = await this.quotationsRepository.find({
      id_conta,
      id_estabelecimento,
      id_loja
    }, filter);
    quotations.map(quotation => {
      if (quotation.situacao === 'P') {
        quotation.situacao = 'Pendente';
      } else if (quotation.situacao === 'VP') {
        quotation.situacao = 'Venda Parcial';
      } else if (quotation.situacao === 'VI') {
        quotation.situacao = 'Venda Integral';
      } else if (quotation.situacao === 'C') {
        quotation.situacao = 'Cancelado';
      }

      return quotation;
    });
    return new _AppListResponse.default(quotations, filter.page, filter.pageSize);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = ListQuotationsService;