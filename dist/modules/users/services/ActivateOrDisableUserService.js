"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IUserRepository = _interopRequireDefault(require("../repositories/IUserRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ActivateOrDisableUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ActivateOrDisableUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(id, activate) {
    const user = await this.usersRepository.findById(id);
    user.is_ativo = activate ? '1' : '0';
    const userSave = await this.usersRepository.save(user);
    return userSave;
  }

}) || _class) || _class) || _class) || _class);
exports.default = ActivateOrDisableUserService;