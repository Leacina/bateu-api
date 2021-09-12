"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppListResponse = _interopRequireDefault(require("../../../../shared/utils/implementations/AppListResponse"));

var _IUserRepository = _interopRequireDefault(require("../../repositories/IUserRepository"));

var _INotificationsRepository = _interopRequireDefault(require("../../repositories/INotificationsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListNotificationService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('NotificationsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _INotificationsRepository.default === "undefined" ? Object : _INotificationsRepository.default, typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListNotificationService {
  constructor(notificationsRepository, usersRepository) {
    this.notificationsRepository = notificationsRepository;
    this.usersRepository = usersRepository;
  }

  async execute(filter, user_id) {
    const user = await this.usersRepository.findById(user_id);
    const notifications = await this.notificationsRepository.find(filter, {
      user_id,
      shop_id: user.id_loja,
      establishment_id: user.id_estabelecimento
    });
    return new _AppListResponse.default(notifications, filter.page, filter.pageSize);
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = ListNotificationService;