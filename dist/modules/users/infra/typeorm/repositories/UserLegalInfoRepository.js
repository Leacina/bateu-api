"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _UserLegalInfo = _interopRequireDefault(require("../entities/UserLegalInfo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserLegalInfoRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_UserLegalInfo.default);
  }

  async create(data) {
    const user = this.ormRepository.create(data);
    await this.ormRepository.save(user);
    return user;
  }

}

var _default = UserLegalInfoRepository;
exports.default = _default;