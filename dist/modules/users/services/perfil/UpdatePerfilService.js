"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var yup = _interopRequireWildcard(require("yup"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _IPerfilRepository = _interopRequireDefault(require("../../repositories/IPerfilRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let UpdatePerfilService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PerfilRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IPerfilRepository.default === "undefined" ? Object : _IPerfilRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdatePerfilService {
  /**
   * Realiza a injeção de dependencia de acordo com a pasta Provider.
   * @param perfilRepository
   */
  constructor(perfilRepository) {
    this.perfilRepository = perfilRepository;
  }

  async execute(id_perfil, {
    nm_menu,
    tp_perfil
  }) {
    // Validações necessárias para criar o usuário
    const schema = yup.object().shape({
      nm_menu: yup.string().nullable(true).required('Nenhum menu foi informado')
    }); // Caso houver algum erro retorna com status 422

    await schema.validate({
      nm_menu
    }).catch(err => {
      throw new _AppError.default(err.message, 422);
    }); // Cria a conta

    const perfil = await this.perfilRepository.findById(id_perfil);
    perfil.nm_menu = nm_menu;
    perfil.tp_perfil = tp_perfil;
    await this.perfilRepository.save(perfil);
    return perfil;
  }

}) || _class) || _class) || _class) || _class);
var _default = UpdatePerfilService;
exports.default = _default;