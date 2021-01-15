"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Account = _interopRequireDefault(require("../entities/Account"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AccountsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Account.default);
  }

  async create({
    is_anuncio,
    nm_conta,
    is_ativo
  }) {
    const account = this.ormRepository.create({
      is_anuncio,
      nm_conta,
      is_ativo,
      dh_inc: new Date()
    });
    await this.ormRepository.save(account);
    return account;
  }

  async findById(id) {
    const account = await this.ormRepository.findOne(id);
    return account;
  }

}

var _default = AccountsRepository;
exports.default = _default;