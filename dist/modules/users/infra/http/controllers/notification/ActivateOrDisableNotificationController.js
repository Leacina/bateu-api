"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ActivateOrDisableNotificationService = _interopRequireDefault(require("../../../../services/ActivateOrDisableNotificationService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ActivateOrDisableNotificationController {
  async create(request, response) {
    const {
      email,
      active,
      sw_notification
    } = request.body;

    const activateOrDisableNotificationService = _tsyringe.container.resolve(_ActivateOrDisableNotificationService.default);

    await activateOrDisableNotificationService.execute({
      active,
      email,
      sw_notification
    });
    return response.json({
      OK: true
    });
  }

}

exports.default = ActivateOrDisableNotificationController;