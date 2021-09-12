"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _UpdateQuotationViewClienteService = _interopRequireDefault(require("../../../services/UpdateQuotationViewClienteService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class QuotationsController {
  async create(request, response) {
    const {
      view,
      id
    } = request.params;

    const updateQuotationViewClienteService = _tsyringe.container.resolve(_UpdateQuotationViewClienteService.default);

    const quotations = await updateQuotationViewClienteService.execute({
      quotation_id: Number(id),
      isView: Number(view)
    });
    return response.json(quotations);
  }

}

exports.default = QuotationsController;