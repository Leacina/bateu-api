"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _UserToken = _interopRequireDefault(require("../entities/UserToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserTokenRepository {
  constructor() {
    this.ormRepository = void 0;
    this.searchSplit = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_UserToken.default);
  }

  async findByToken(token) {
    const userToken = await this.ormRepository.findOne({
      where: {
        token
      }
    });
    return userToken;
  }

  async deleteById(user_id) {
    await this.ormRepository.delete({
      user_id
    });
  }

  async generate(user_id) {
    const userToken = this.ormRepository.create({
      user_id,
      dh_inc: new Date()
    });
    await this.ormRepository.save(userToken);
    return userToken;
  }

}

var _default = UserTokenRepository;
exports.default = _default;