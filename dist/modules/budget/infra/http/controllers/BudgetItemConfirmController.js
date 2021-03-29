"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _UpdateBudgetItemProcessService = _interopRequireDefault(require("../../../services/UpdateBudgetItemProcessService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BudgetItemConfirmController {
  async update(request, response) {
    const {
      id
    } = request.params;

    const updateBudgetItemProcessService = _tsyringe.container.resolve(_UpdateBudgetItemProcessService.default);

    const budgets = await updateBudgetItemProcessService.execute({
      budget_item_id: Number(id),
      isConfirm: true
    });
    return response.json(budgets);
  }

}

exports.default = BudgetItemConfirmController;