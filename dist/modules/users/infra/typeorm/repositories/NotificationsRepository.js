"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Notification = _interopRequireDefault(require("../entities/Notification"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NotificationRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Notification.default);
  }

  async create({
    id_cotacao,
    id_orcamento,
    id_usuario,
    mensagem,
    id_loja
  }) {
    const notification = this.ormRepository.create({
      id_cotacao,
      id_loja,
      id_orcamento,
      id_usuario,
      mensagem
    });
    await this.ormRepository.save(notification);
    return notification;
  }

  async findById(id) {
    const notification = await this.ormRepository.findOne({
      where: {
        id
      }
    });
    return notification;
  }

  async save(notification) {
    const notificationSave = await this.ormRepository.save(notification);
    return notificationSave;
  }

  async saveAll(notification) {
    const notificationSave = await this.ormRepository.save(notification);
    return notificationSave;
  }

  async findByIdUser(id_user) {
    const notifications = this.ormRepository.find({
      where: {
        id_usuario: id_user
      }
    });
    return notifications;
  }

  async find({
    search,
    page,
    pageSize
  }, filterList) {
    let where = '';

    if (filterList.shop_id > 0) {
      where = `notification.id_loja = ${filterList.shop_id}`;
    } else {
      where = `notification.id_usuario = ${filterList.user_id}`;
    }

    const notifications = await this.ormRepository.find({
      join: {
        alias: 'notification'
      },
      where: qb => {
        qb.where(where);
      },
      skip: page,
      take: pageSize,
      order: {
        id: 'DESC'
      },
      relations: ['cotacao', 'orcamento']
    });
    return notifications;
  }

  async deleteByBudget(id_budget) {
    await this.ormRepository.delete({
      id_orcamento: id_budget
    });
  }

  async deleteByQuotation(id_quotation) {
    await this.ormRepository.delete({
      id_cotacao: id_quotation
    });
  }

}

var _default = NotificationRepository;
exports.default = _default;