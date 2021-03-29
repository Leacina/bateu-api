"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var yup = _interopRequireWildcard(require("yup"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IUserRepository = _interopRequireDefault(require("../../users/repositories/IUserRepository"));

var _IAccountsRepository = _interopRequireDefault(require("../../users/repositories/IAccountsRepository"));

var _IEstablishmentsRepository = _interopRequireDefault(require("../repositories/IEstablishmentsRepository"));

var _CreateDefaultCategoryForEstablishmentService = _interopRequireDefault(require("../../piece/services/category/CreateDefaultCategoryForEstablishmentService"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let CreateEstablishmentService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('EstablishmentsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('AccountsRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IEstablishmentsRepository.default === "undefined" ? Object : _IEstablishmentsRepository.default, typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default, typeof _IAccountsRepository.default === "undefined" ? Object : _IAccountsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateEstablishmentService {
  /**
   * Realiza a injeção de dependencia de acordo com a pasta Provider.
   * @param establishmentsRepository
   */
  constructor(establishmentsRepository, usersRepository, accountsRepository) {
    this.establishmentsRepository = establishmentsRepository;
    this.usersRepository = usersRepository;
    this.accountsRepository = accountsRepository;
  }

  async execute({
    cnpj_cpf,
    nm_estabelecimento,
    razao_social,
    responsavel,
    cidade,
    estado,
    quantidade_lojas,
    telefone_responsavel
  }, user_id) {
    // Validações necessárias para criar o usuário
    const schema = yup.object().shape({
      // cnpj_cpf: yup.string().required('CPF/CNPJ não informado'),
      nm_estabelecimento: yup.string().trim().required('Nome da empresa não informado'),
      // razao_social: yup.string().required('Razão social não informada'),
      responsavel: yup.string().trim().required('Responsável não informado'),
      cidade: yup.string().trim().required('Cidade não informado'),
      estado: yup.string().nullable().required('Estado não informado'),
      quantidade_lojas: yup.number().required('Quantidade de lojas não informado'),
      telefone_responsavel: yup.string().required('Telefone do responsável não informado')
    }); // Caso houver algum erro retorna com status 422

    await schema.validate({
      // cnpj_cpf,
      nm_estabelecimento,
      // razao_social,
      responsavel,
      cidade,
      estado,
      quantidade_lojas,
      telefone_responsavel
    }).catch(err => {
      throw new _AppError.default(err.message, 422);
    });
    const user = await this.usersRepository.findById(user_id);
    const establishment = await this.establishmentsRepository.create({
      cnpj_cpf,
      id_conta: user.id_conta,
      nm_estabelecimento,
      razao_social: nm_estabelecimento,
      responsavel,
      cidade,
      estado,
      quantidade_lojas,
      telefone_responsavel
    });
    const account = await this.accountsRepository.create({
      id: Number(establishment.id),
      is_anuncio: 'Sim',
      is_ativo: 'Sim',
      nm_conta: establishment.nm_estabelecimento
    });
    const establishmentUpdate = await this.establishmentsRepository.findById(Number(establishment.id));
    establishmentUpdate.id_conta = account.id;
    await this.establishmentsRepository.save(establishmentUpdate); // Cria todas as categorias defaultr

    const createDefaultCategory = _tsyringe.container.resolve(_CreateDefaultCategoryForEstablishmentService.default);

    createDefaultCategory.execute(account.id);
    const userModel = await this.usersRepository.create({
      ds_login: `administrador@${nm_estabelecimento.replace(/\s/g, '').toLowerCase()}.com.br`,
      ds_senha: '$administrador102030$',
      id_estabelecimento: Number(establishment.id),
      id_perfil: 999,
      nm_usuario: 'Administrador'
    });
    return {
      estabelecimento: establishment,
      usuario: userModel
    };
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = CreateEstablishmentService;