"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListItemsByBudget = _interopRequireDefault(require("../../../services/ListItemsByBudget"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import CreateBudgetService from '@modules/budget/services/CreateBudgetService';
class BudgetsController {
  async index(request, response) {
    const {
      id
    } = request.params;
    const {
      page,
      pageSize
    } = request.query;

    const listBudgetsItems = _tsyringe.container.resolve(_ListItemsByBudget.default);

    const brands = await listBudgetsItems.execute(Number(id), Number(request.user.id), {
      page: Number(page),
      pageSize: Number(pageSize)
    });
    return response.json(brands);
  }

}

exports.default = BudgetsController;