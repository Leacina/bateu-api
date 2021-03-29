"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListBugetsService = _interopRequireDefault(require("../../../services/ListBugetsService"));

var _ListBudgetByIdService = _interopRequireDefault(require("../../../services/ListBudgetByIdService"));

var _CreateBudgetService = _interopRequireDefault(require("../../../services/CreateBudgetService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BudgetsController {
  async create(request, response) {
    const {
      items,
      emitente,
      emitente_email,
      emitente_telefone
    } = request.body;

    const createBudgetService = _tsyringe.container.resolve(_CreateBudgetService.default);

    const brands = await createBudgetService.execute(Number(request.user.id), {
      emitente,
      emitente_email,
      emitente_telefone
    }, items);
    return response.json(brands);
  }

  async show(request, response) {
    const {
      page,
      pageSize,
      search
    } = request.query;

    const listBudgets = _tsyringe.container.resolve(_ListBugetsService.default);

    const brands = await listBudgets.execute(Number(request.user.id), {
      search: search ? String(search) : '',
      page: Number(page),
      pageSize: Number(pageSize)
    });
    return response.json(brands);
  }

  async index(request, response) {
    const {
      id
    } = request.params;

    const listBudgetByIdService = _tsyringe.container.resolve(_ListBudgetByIdService.default);

    const brands = await listBudgetByIdService.execute(Number(id), Number(request.user.id));
    return response.json(brands);
  }

}

exports.default = BudgetsController;