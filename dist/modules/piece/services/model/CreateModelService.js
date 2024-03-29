"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IUserRepository = _interopRequireDefault(require("../../../users/repositories/IUserRepository"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _IShopsRepository = _interopRequireDefault(require("../../../establishment/repositories/IShopsRepository"));

var _IEstablishmentsRepository = _interopRequireDefault(require("../../../establishment/repositories/IEstablishmentsRepository"));

var _IBrandsRepository = _interopRequireDefault(require("../../repositories/IBrandsRepository"));

var _IModelsRepository = _interopRequireDefault(require("../../repositories/IModelsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateModelService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ModelsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('BrandsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('ShopsRepository')(target, undefined, 3);
}, _dec6 = function (target, key) {
  return (0, _tsyringe.inject)('EstablishmentsRepository')(target, undefined, 4);
}, _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [typeof _IModelsRepository.default === "undefined" ? Object : _IModelsRepository.default, typeof _IBrandsRepository.default === "undefined" ? Object : _IBrandsRepository.default, typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default, typeof _IShopsRepository.default === "undefined" ? Object : _IShopsRepository.default, typeof _IEstablishmentsRepository.default === "undefined" ? Object : _IEstablishmentsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = class CreateModelService {
  constructor(modelsRepository, brandsRepository, usersRepository, shopsRepository, establishmentsRepository) {
    this.modelsRepository = modelsRepository;
    this.brandsRepository = brandsRepository;
    this.usersRepository = usersRepository;
    this.shopsRepository = shopsRepository;
    this.establishmentsRepository = establishmentsRepository;
  }

  async execute({
    id_estabelecimento,
    id_loja,
    id_marca,
    modelo,
    user_id
  }) {
    if (!modelo) {
      throw new _AppError.default('Modelo não informado');
    }

    const user = await this.usersRepository.findById(user_id);
    const brand = await this.brandsRepository.findByID(id_marca, user.id_conta);

    if (!brand) {
      throw new _AppError.default('Marca não encontrada');
    } // Verifica se o estabelecimento esta correto


    if (id_estabelecimento) {
      const establishment = await this.establishmentsRepository.findById(id_estabelecimento); // Verifica se o estabelecimento existe

      if (!establishment) {
        throw new _AppError.default('Estabelecimento informado inválido');
      } // Verifica se tem permissão


      if (establishment.id_conta !== user.id_conta) {
        throw new _AppError.default('Você não tem permissão para criar com este estabelecimento', 403);
      }
    } // Verifica se a loja esta correto


    if (id_loja) {
      const shop = await this.shopsRepository.findById(id_loja);

      if (!shop) {
        throw new _AppError.default('Loja informada inválida');
      } // Verifica se tem permissão


      if (shop.id_conta !== user.id_conta) {
        throw new _AppError.default('Você não tem permissão para criar com esta loja', 403);
      }
    }

    const model = await this.modelsRepository.create({
      id_conta: user.id_conta,
      id_estabelecimento,
      modelo,
      id_marca,
      id_loja
    });
    return model;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = CreateModelService;