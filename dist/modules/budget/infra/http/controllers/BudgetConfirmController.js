"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _UpdateBudgetProcessService = _interopRequireDefault(require("../../../services/UpdateBudgetProcessService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import CreateBudgetService from '@modules/budget/services/CreateBudgetService';
class BudgetConfirmController {
  async update(request, response) {
    const {
      id
    } = request.params;

    const updateBudgetProcessService = _tsyringe.container.resolve(_UpdateBudgetProcessService.default);

    const brands = await updateBudgetProcessService.execute({
      budget_id: Number(id),
      isConfirm: true
    }, Number(3));
    return response.json(brands);
  }

}

exports.default = BudgetConfirmController;