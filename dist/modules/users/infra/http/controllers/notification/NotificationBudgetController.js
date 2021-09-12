"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _DeleteNotificationByBudgetService = _interopRequireDefault(require("../../../../services/notification/DeleteNotificationByBudgetService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NotificationBudgetController {
  async delete(request, response) {
    const {
      id
    } = request.params;

    const deleteNotificationByBudgetService = _tsyringe.container.resolve(_DeleteNotificationByBudgetService.default);

    deleteNotificationByBudgetService.execute(Number(id));
    return response.json({
      ok: true
    });
  }

}

exports.default = NotificationBudgetController;