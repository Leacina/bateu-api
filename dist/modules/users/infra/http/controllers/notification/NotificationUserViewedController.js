"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CheckViewedUserService = _interopRequireDefault(require("../../../../services/notification/CheckViewedUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NotificationController {
  async create(request, response) {
    const {
      id
    } = request.params;

    const checkViewedUserService = _tsyringe.container.resolve(_CheckViewedUserService.default);

    const notifications = await checkViewedUserService.execute(Number(id));
    return response.json(notifications);
  }

}

exports.default = NotificationController;