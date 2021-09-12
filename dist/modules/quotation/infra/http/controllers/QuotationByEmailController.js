"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListQuotationByEmailService = _interopRequireDefault(require("../../../services/ListQuotationByEmailService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class QuotationByEmailController {
  async show(request, response) {
    const {
      email
    } = request.params;
    const {
      page,
      pageSize,
      search,
      isViewAll
    } = request.query;

    const listQuotations = _tsyringe.container.resolve(_ListQuotationByEmailService.default);

    const quotations = await listQuotations.execute(email, Number(request.user.id), {
      search: search ? String(search) : '',
      page: Number(page),
      pageSize: Number(pageSize)
    }, Number(isViewAll));
    return response.json(quotations);
  }

}

exports.default = QuotationByEmailController;