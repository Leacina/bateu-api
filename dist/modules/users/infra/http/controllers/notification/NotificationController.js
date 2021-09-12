"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateNotificationService = _interopRequireDefault(require("../../../../services/notification/CreateNotificationService"));

var _ListNotificationByIdService = _interopRequireDefault(require("../../../../services/notification/ListNotificationByIdService"));

var _ListNotificationsService = _interopRequireDefault(require("../../../../services/notification/ListNotificationsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NotificationController {
  async create(request, response) {
    const createNotificationService = _tsyringe.container.resolve(_CreateNotificationService.default);

    const notification = await createNotificationService.execute(request.body);
    return response.json(notification);
  }

  async index(request, response) {
    const {
      id
    } = request.params;

    const listNotificationByIdService = _tsyringe.container.resolve(_ListNotificationByIdService.default);

    const notifications = await listNotificationByIdService.execute(Number(id));
    return response.json(notifications);
  }

  async show(request, response) {
    const {
      page,
      search
    } = request.query;

    const listNotificationsService = _tsyringe.container.resolve(_ListNotificationsService.default);

    const notification = await listNotificationsService.execute({
      search: search ? String(search) : '',
      page: Number(page),
      pageSize: 50
    }, Number(request.user.id));
    return response.json(notification);
  }

}

exports.default = NotificationController;