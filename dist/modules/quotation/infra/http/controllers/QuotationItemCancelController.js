"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _UpdateQuotationItemProcessService = _interopRequireDefault(require("../../../services/UpdateQuotationItemProcessService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class QuotationItemCancelController {
  async update(request, response) {
    const {
      id
    } = request.params;

    const updateQuotationItemProcessService = _tsyringe.container.resolve(_UpdateQuotationItemProcessService.default);

    const quotations = await updateQuotationItemProcessService.execute({
      quotation_item_id: Number(id),
      isConfirm: false
    });
    return response.json(quotations);
  }

}

exports.default = QuotationItemCancelController;