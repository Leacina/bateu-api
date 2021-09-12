"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _DeleteNotificationByQuotationService = _interopRequireDefault(require("../../../../services/notification/DeleteNotificationByQuotationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NotificationQuotationController {
  async delete(request, response) {
    const {
      id
    } = request.params;

    const deleteNotificationByQuotationService = _tsyringe.container.resolve(_DeleteNotificationByQuotationService.default);

    deleteNotificationByQuotationService.execute(Number(id));
    return response.json({
      ok: true
    });
  }

}

exports.default = NotificationQuotationController;