"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListBudgetsByEmailService = _interopRequireDefault(require("../../../services/ListBudgetsByEmailService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BudgetsController {
  async index(request, response) {
    const {
      email
    } = request.params;
    const {
      page,
      pageSize
    } = request.query;

    const listBudgets = _tsyringe.container.resolve(_ListBudgetsByEmailService.default);

    const brands = await listBudgets.execute(email, Number(request.user.id), {
      page: Number(page),
      pageSize: Number(pageSize)
    });
    return response.json(brands);
  }

}

exports.default = BudgetsController;