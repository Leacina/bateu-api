"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var yup = _interopRequireWildcard(require("yup"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IAccountsRepository = _interopRequireDefault(require("../../users/repositories/IAccountsRepository"));

var _IEstablishmentsRepository = _interopRequireDefault(require("../repositories/IEstablishmentsRepository"));

var _IShopsRepository = _interopRequireDefault(require("../repositories/IShopsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let UpdateShopService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ShopsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('AccountsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('EstablishmentsRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IShopsRepository.default === "undefined" ? Object : _IShopsRepository.default, typeof _IAccountsRepository.default === "undefined" ? Object : _IAccountsRepository.default, typeof _IEstablishmentsRepository.default === "undefined" ? Object : _IEstablishmentsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class UpdateShopService {
  /**
   * Realiza a injeção de dependencia de acordo com a pasta Provider.
   * @param shopsRepository
   */
  constructor(shopsRepository, accountsRepository, establishmentsRepository) {
    this.shopsRepository = shopsRepository;
    this.accountsRepository = accountsRepository;
    this.establishmentsRepository = establishmentsRepository;
  }

  async execute(shop_id, {
    // pais,
    bairro,
    // cep,
    cidade,
    complemento,
    email,
    endereco,
    estado,
    fone_principal,
    fone_skype,
    fone_whats,
    id_estabelecimento,
    imagem_loja,
    nm_loja,
    id_conta,
    cnpj_cpf,
    numero
  }) {
    const schema = yup.object().shape({
      nm_loja: yup.string().required('Nome da loja não informado'),
      // id_conta: yup.number().required('Conta não informada'),
      id_estabelecimento: yup.number().required('Estabelecimento não informado'),
      cnpj_cpf: yup.string().required('CNPJ/CPF não informado'),
      estado: yup.string().required('Estado não informado').max(2)
    }); // Caso houver algum erro retorna com status 422

    await schema.validate({
      nm_loja,
      id_conta,
      id_estabelecimento,
      cnpj_cpf,
      estado
    }).catch(err => {
      throw new _AppError.default(err.message, 422);
    }); // const account = await this.accountsRepository.findById(id_conta);
    // if (!account) {
    //  throw new AppError('Conta informada não encontrada', 422);
    // }

    const establishment = await this.establishmentsRepository.findById(id_estabelecimento);

    if (!establishment) {
      throw new _AppError.default('Estabelecimento informado não encontrada', 422);
    }

    const shop = await this.shopsRepository.findById(shop_id);
    shop.nm_loja = nm_loja;
    shop.id_estabelecimento = id_estabelecimento;
    shop.cnpj_cpf = cnpj_cpf;
    shop.email = email;
    shop.fone_principal = fone_principal;
    shop.fone_whats = fone_whats;
    shop.endereco = endereco;
    shop.bairro = bairro;
    shop.cidade = cidade;
    shop.estado = estado;
    shop.numero = numero;
    shop.complemento = complemento;
    console.log(shop.id_estabelecimento);
    await this.shopsRepository.save(shop);
    return shop;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = UpdateShopService;