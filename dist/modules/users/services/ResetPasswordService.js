"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _dateFns = require("date-fns");

var _IUserRepository = _interopRequireDefault(require("../repositories/IUserRepository"));

var _IUserTokensRepository = _interopRequireDefault(require("../repositories/IUserTokensRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ResetPasswordService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UserTokensRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default, typeof _IUserTokensRepository.default === "undefined" ? Object : _IUserTokensRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ResetPasswordService {
  /**
   * Realiza a injeção de dependencia de acordo com a pasta Provider.
   * @param usersRepository
   */
  constructor(usersRepository, userTokensRepository) {
    this.usersRepository = usersRepository;
    this.userTokensRepository = userTokensRepository;
  }

  async execute({
    password,
    token
  }) {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new _AppError.default('Token do usuário não existe');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new _AppError.default('Usuário não existe');
    }

    const tokenCreateAt = userToken.dh_inc;
    const compareDate = (0, _dateFns.addHours)(tokenCreateAt, 2);

    if ((0, _dateFns.isAfter)(Date.now(), compareDate)) {
      throw new _AppError.default('Link para recuperação de senha expirado');
    }

    user.ds_senha = password;
    await this.usersRepository.save(user);
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = ResetPasswordService;
exports.default = _default;