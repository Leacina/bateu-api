"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var yup = _interopRequireWildcard(require("yup"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _INotificationsRepository = _interopRequireDefault(require("../../repositories/INotificationsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let CreateNotificationService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('NotificationsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _INotificationsRepository.default === "undefined" ? Object : _INotificationsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateNotificationService {
  /**
   * Realiza a injeção de dependencia de acordo com a pasta Provider.
   * @param notificationsRepository
   */
  constructor(notificationsRepository) {
    this.notificationsRepository = notificationsRepository;
  }

  async execute({
    id_cotacao,
    id_orcamento,
    mensagem,
    id_usuario
  }) {
    // Validações necessárias para criar a notificcao
    const schema = yup.object().shape({
      mensagem: yup.string().nullable(true).required('Nenhuma mensagem foi informada')
    }); // Caso houver algum erro retorna com status 422

    await schema.validate({
      mensagem
    }).catch(err => {
      throw new _AppError.default(err.message, 422);
    }); // Cria a notificao

    const perfil = await this.notificationsRepository.create({
      id_cotacao,
      id_orcamento,
      mensagem,
      id_usuario
    });
    return perfil;
  }

}) || _class) || _class) || _class) || _class);
var _default = CreateNotificationService;
exports.default = _default;