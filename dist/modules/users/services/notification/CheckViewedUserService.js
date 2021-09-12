"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _INotificationsRepository = _interopRequireDefault(require("../../repositories/INotificationsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListNotificationByIDService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('NotificationsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _INotificationsRepository.default === "undefined" ? Object : _INotificationsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListNotificationByIDService {
  constructor(notificationsRepository) {
    this.notificationsRepository = notificationsRepository;
  }

  async execute(id_user) {
    const notification = await this.notificationsRepository.findById(id_user); // Percorre todos e seta como visualizado
    // eslint-disable-next-line no-plusplus
    // for (let i = 0; i < notification.length; i++) {
    //   notification[i].is_visualizado = 1;
    // }
    // this.notificationsRepository.saveAll(notification);

    notification.is_visualizado = 1;
    this.notificationsRepository.save(notification);
    return notification;
  }

}) || _class) || _class) || _class) || _class);
exports.default = ListNotificationByIDService;