"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListQuotationsService = _interopRequireDefault(require("../../../services/ListQuotationsService"));

var _CreateQuotationService = _interopRequireDefault(require("../../../services/CreateQuotationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class QuotationsController {
  async create(request, response) {
    const {
      items,
      emitente,
      emitente_email,
      emitente_telefone,
      identificador_cotacao,
      cidades,
      lojas
    } = request.body;

    const createQuotationService = _tsyringe.container.resolve(_CreateQuotationService.default);

    const quotations = await createQuotationService.execute(Number(request.user.id), {
      emitente,
      emitente_email,
      emitente_telefone,
      identificador_cotacao,
      cidades,
      lojas
    }, items);
    return response.json(quotations);
  }

  async show(request, response) {
    const {
      page,
      pageSize,
      search
    } = request.query;

    const listQuotationsService = _tsyringe.container.resolve(_ListQuotationsService.default);

    const quotations = await listQuotationsService.execute(Number(request.user.id), {
      search: search ? String(search) : '',
      page: Number(page),
      pageSize: Number(pageSize)
    });
    return response.json(quotations);
  }

}

exports.default = QuotationsController;