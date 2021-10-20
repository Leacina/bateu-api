"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../../../config/auth"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _IShopsRepository = _interopRequireDefault(require("../../establishment/repositories/IShopsRepository"));

var _IUserRepository = _interopRequireDefault(require("../repositories/IUserRepository"));

var _IHashProvider = _interopRequireDefault(require("../providers/HashProvider/models/IHashProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AuthenticateUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('ShopsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default, typeof _IShopsRepository.default === "undefined" ? Object : _IShopsRepository.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class AuthenticateUserService {
  constructor(usersRepository, shopsRepository, hashProvider) {
    this.usersRepository = usersRepository;
    this.shopsRepository = shopsRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    email,
    senha,
    sw_notification
  }) {
    const user = await this.usersRepository.findByEmail(email);
    console.log('teste');

    if (!user) {
      throw new _AppError.default('Usuário ou senha inválido.', 401);
    } // const isPasswordMatch = await this.hashProvider.compareHash(
    //  senha,
    //  user.ds_senha,
    // );
    // if (
    //  Number(user.id_estabelecimento) === 0 &&
    //  Number(user.id_loja) === 0 &&
    //  user.ds_login !== 'administrador@bateu.com.br' &&
    //  user.tp_usuario === ''
    // ) {
    // throw new AppError('Usuário ou senha inválido.', 401);
    // }


    if (senha !== user.ds_senha) {
      throw new _AppError.default('Usuário ou senha inválido.', 401);
    }

    const {
      expiresIn,
      secret
    } = _auth.default.jwt;
    const shop = await this.shopsRepository.findById(user.id_loja);
    const token = (0, _jsonwebtoken.sign)({
      id: user.id,
      name: user.nm_usuario,
      email: user.ds_login,
      is_bateu: user.ds_login === 'administrador@bateu.com.br',
      account_id: user.id_conta || '0',
      cellphone: user.telefone,
      establishment_id: user.id_estabelecimento || '0',
      shop_id: user.id_loja || '0',
      shop_name: shop ? shop.nm_loja : ''
    }, secret, {
      expiresIn,
      subject: user.id
    });
    user.sw_notification = sw_notification;
    this.usersRepository.save(user);
    return {
      user,
      token
    };
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = AuthenticateUserService;
exports.default = _default;