"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var yup = _interopRequireWildcard(require("yup"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IUserLegalInfoRepository = _interopRequireDefault(require("../repositories/IUserLegalInfoRepository"));

var _IUserRepository = _interopRequireDefault(require("../repositories/IUserRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let CreateUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserLegalInfoRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUserLegalInfoRepository.default === "undefined" ? Object : _IUserLegalInfoRepository.default, typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateUserService {
  /**
   * Realiza a injeção de dependencia de acordo com a pasta Provider.
   * @param usersRepository
   */
  constructor(usersLegalInfoRepository, usersRepository) {
    this.usersLegalInfoRepository = usersLegalInfoRepository;
    this.usersRepository = usersRepository;
  }

  async execute(data) {
    // Validações necessárias para criar o usuário
    const schema = yup.object().shape({
      razao_social: yup.string().required('Razão social é obrigatório'),
      nome_fantasia: yup.string().required('O campo nome fantasia não foi informado'),
      cnpj: yup.string().required('O campo cnpj não foi informado'),
      // id_conta: yup.number().required('O campo conta não foi informado'),
      inscricao_estadual: yup.string().required('O campo inscrição estadual não foi informado'),
      telefone: yup.string().required('O campo telefone não foi informado')
    }); // Caso houver algum erro retorna com status 422

    await schema.validate(data).catch(err => {
      throw new _AppError.default(err.message, 422);
    });
    const user = await this.usersRepository.findById(data.id_usuario || 0);

    if (!user) {
      throw new _AppError.default('Usuário não encontrado', 400);
    } // Cria o usuario


    const userLegalInfo = await this.usersLegalInfoRepository.create({ ...data
    });
    return userLegalInfo;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = CreateUserService;
exports.default = _default;