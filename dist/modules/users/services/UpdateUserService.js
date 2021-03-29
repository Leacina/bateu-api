"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var yup = _interopRequireWildcard(require("yup"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IEstablishmentsRepository = _interopRequireDefault(require("../../establishment/repositories/IEstablishmentsRepository"));

var _IShopsRepository = _interopRequireDefault(require("../../establishment/repositories/IShopsRepository"));

var _IUserRepository = _interopRequireDefault(require("../repositories/IUserRepository"));

var _IAccountsRepository = _interopRequireDefault(require("../repositories/IAccountsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let UpdateUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('ShopsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('EstablishmentsRepository')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('AccountsRepository')(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default, typeof _IShopsRepository.default === "undefined" ? Object : _IShopsRepository.default, typeof _IEstablishmentsRepository.default === "undefined" ? Object : _IEstablishmentsRepository.default, typeof _IAccountsRepository.default === "undefined" ? Object : _IAccountsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class UpdateUserService {
  /**
   * Realiza a injeção de dependencia de acordo com a pasta Provider.
   * @param usersRepository
   */
  constructor(usersRepository, shopsRepository, establishmentsRepository, accountsRepository) {
    this.usersRepository = usersRepository;
    this.shopsRepository = shopsRepository;
    this.establishmentsRepository = establishmentsRepository;
    this.accountsRepository = accountsRepository;
  }

  async execute(id_user, {
    ds_login,
    ds_senha,
    id_conta,
    id_estabelecimento,
    id_loja,
    id_perfil,
    is_ativo,
    nm_usuario,
    telefone,
    tp_usuario
  }) {
    const data = {
      ds_login,
      ds_senha,
      id_conta,
      id_estabelecimento,
      id_loja,
      id_perfil,
      is_ativo,
      nm_usuario,
      telefone,
      tp_usuario
    }; // Validações necessárias para criar o usuário

    const schema = yup.object().shape({
      ds_login: yup.string().email('E-mail informado inválido').required('O campo e-mail é obrigatório'),
      nm_usuario: yup.string().required('O campo nome não foi informado'),
      ds_senha: yup.string().required('O campo senha não foi informado'),
      // id_conta: yup.number().required('O campo conta não foi informado'),
      id_perfil: yup.number().required('O campo perfil não foi informado'),
      is_ativo: yup.string().default(() => {
        return 'Sim';
      })
    }); // Caso houver algum erro retorna com status 422

    await schema.validate(data).catch(err => {
      throw new _AppError.default(err.message, 422);
    }); // Se não existir estabelecimento

    const establishment = await this.establishmentsRepository.findById(id_estabelecimento || 0);

    if (!establishment) {
      throw new _AppError.default('Estabelecimento informado inválido');
    } // Se não existe loja


    const shop = await this.shopsRepository.findById(id_loja || 0);

    if (!shop) {
      throw new _AppError.default('Loja informada inválida');
    } // Cria o usuario


    const user = await this.usersRepository.findById(id_user); // Seta os novos valores

    user.ds_login = data.ds_login;
    user.id_perfil = data.id_perfil;
    user.nm_usuario = data.nm_usuario;
    user.id_estabelecimento = id_estabelecimento;
    user.id_loja = id_loja;
    await this.usersRepository.save(user);
    return user;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = UpdateUserService;
exports.default = _default;