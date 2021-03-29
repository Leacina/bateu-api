"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListItemsQuotationByIdentifierService = _interopRequireDefault(require("../../../services/ListItemsQuotationByIdentifierService"));

var _UpdateValueItemQuotationService = _interopRequireDefault(require("../../../services/UpdateValueItemQuotationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import CreateBudgetService from '@modules/budget/services/CreateBudgetService';
class QuotationItemsController {
  async index(request, response) {
    const {
      id
    } = request.params;
    const {
      page,
      pageSize
    } = request.query;

    const listItemsQuotationByIdentifierService = _tsyringe.container.resolve(_ListItemsQuotationByIdentifierService.default);

    console.log(id);
    const brands = await listItemsQuotationByIdentifierService.execute(Number(id), Number(request.user.id), {
      page: Number(page),
      pageSize: Number(pageSize)
    });
    return response.json(brands);
  }

  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      valor_peca
    } = request.body;

    const updateValueItemQuotationService = _tsyringe.container.resolve(_UpdateValueItemQuotationService.default);

    const quotations = await updateValueItemQuotationService.execute({
      id: Number(id),
      value: valor_peca
    });
    return response.json(quotations);
  }

}

exports.default = QuotationItemsController;