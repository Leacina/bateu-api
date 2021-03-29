"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IQuotationItemsRepository = _interopRequireDefault(require("../repositories/IQuotationItemsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateQuotationItemProcessService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('QuotationItemsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IQuotationItemsRepository.default === "undefined" ? Object : _IQuotationItemsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateQuotationItemProcessService {
  constructor(quotationItemsRepository) {
    this.quotationItemsRepository = quotationItemsRepository;
  }

  async execute({
    quotation_item_id,
    isConfirm
  }) {
    const budgetItem = await this.quotationItemsRepository.process({
      quotation_item_id,
      isConfirm
    });
    return budgetItem;
  }

}) || _class) || _class) || _class) || _class);
exports.default = UpdateQuotationItemProcessService;