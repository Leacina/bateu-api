"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var yup = _interopRequireWildcard(require("yup"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _IAccountsRepository = _interopRequireDefault(require("../../repositories/IAccountsRepository"));

var _IUsersRepository = _interopRequireDefault(require("../../repositories/IUsersRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let CreateUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AccountsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IAccountsRepository.default === "undefined" ? Object : _IAccountsRepository.default, typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateUserService {
  /**
   * Realiza a injeção de dependencia de acordo com a pasta Provider.
   * @param accountsRepository
   */
  constructor(accountsRepository, usersRepository) {
    this.accountsRepository = accountsRepository;
    this.usersRepository = usersRepository;
  }

  async execute({
    is_anuncio,
    is_ativo,
    nm_conta
  }) {
    // Validações necessárias para criar o usuário
    const schema = yup.object().shape({
      nm_conta: yup.string().required('Nome da conta não foi informado'),
      is_anuncio: yup.string().default(() => {
        return 'Sim';
      }),
      is_ativo: yup.string().default(() => {
        return 'Sim';
      })
    }); // Caso houver algum erro retorna com status 422

    await schema.validate({
      is_anuncio,
      is_ativo,
      nm_conta
    }).catch(err => {
      throw new _AppError.default(err.message, 422);
    }); // Cria a conta

    const account = await this.accountsRepository.create({
      is_anuncio: is_anuncio || 'Sim',
      is_ativo: is_ativo || 'Sim',
      nm_conta
    }); // Cria o usario de acordo com a conta (Usuario administradosr)

    const user = await this.usersRepository.create({
      ds_login: `administrador@${nm_conta.replace(/\s/g, '').toLowerCase()}.com.br`,
      ds_senha: '$administrador102030$',
      id_conta: account.id,
      id_estabelecimento: null,
      id_perfil: 999,
      nm_usuario: 'Administrador'
    });
    return {
      conta: account,
      usuario: user
    };
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = CreateUserService;
exports.default = _default;