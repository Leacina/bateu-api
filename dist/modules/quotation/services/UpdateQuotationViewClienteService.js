"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IQuotationsRepository = _interopRequireDefault(require("../repositories/IQuotationsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateQuotationItemProcessService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('QuotationsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IQuotationsRepository.default === "undefined" ? Object : _IQuotationsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateQuotationItemProcessService {
  constructor(quotationsRepository) {
    this.quotationsRepository = quotationsRepository;
  }

  async execute({
    quotation_id,
    isView
  }) {
    // Verifica se a cotação foi finalizada
    const quotation = await this.quotationsRepository.findById(Number(quotation_id));

    if (!quotation) {
      throw new _AppError.default('Cotação não encontrada', 400);
    }

    const quotationModel = await this.quotationsRepository.processView(quotation_id, isView);
    return quotationModel;
  }

}) || _class) || _class) || _class) || _class);
exports.default = UpdateQuotationItemProcessService;