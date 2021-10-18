"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _socket = _interopRequireDefault(require("socket.io-client"));

var _INotificationsRepository = _interopRequireDefault(require("../../users/repositories/INotificationsRepository"));

var _IUserRepository = _interopRequireDefault(require("../../users/repositories/IUserRepository"));

var _IMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/models/IMailProvider"));

var _path = _interopRequireDefault(require("path"));

var _IQuotationItemsRepository = _interopRequireDefault(require("../repositories/IQuotationItemsRepository"));

var _IQuotationsRepository = _interopRequireDefault(require("../repositories/IQuotationsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ioClientConnect = (0, _socket.default)('https://bateuweb.com.br/', {
  transports: ['websocket'],
  upgrade: false
});
let UpdateValueItemQuotationProcessService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('QuotationItemsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('NotificationsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('QuotationsRepository')(target, undefined, 3);
}, _dec6 = function (target, key) {
  return (0, _tsyringe.inject)('MailProvider')(target, undefined, 4);
}, _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [typeof _IQuotationItemsRepository.default === "undefined" ? Object : _IQuotationItemsRepository.default, typeof _INotificationsRepository.default === "undefined" ? Object : _INotificationsRepository.default, typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default, typeof _IQuotationsRepository.default === "undefined" ? Object : _IQuotationsRepository.default, typeof _IMailProvider.default === "undefined" ? Object : _IMailProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = class UpdateValueItemQuotationProcessService {
  constructor(quotationItemsRepository, notificationsRepository, usersRepository, quotationsRepository, mailProvider) {
    this.quotationItemsRepository = quotationItemsRepository;
    this.notificationsRepository = notificationsRepository;
    this.usersRepository = usersRepository;
    this.quotationsRepository = quotationsRepository;
    this.mailProvider = mailProvider;
  }

  async execute({
    id,
    value,
    condition,
    observation
  }) {
    const budgetItem = await this.quotationItemsRepository.updateValue({
      id,
      value,
      condition,
      observation
    }); // Verifica se a cotação foi finalizada

    const quotation = await this.quotationsRepository.findById(Number(budgetItem.id_cotacao)); // Busca o usuário para saber qual o id para notificar

    const usuario = await this.usersRepository.findByEmail(quotation.emitente_email);
    const notification = await this.notificationsRepository.create({
      id_cotacao: Number(quotation.id),
      id_usuario: Number(usuario.id),
      id_loja: 0,
      mensagem: `O item ${budgetItem.descricao_peca} da sua cotação ${quotation.identificador_cotacao} teve uma alteração pela loja ${quotation.loja.nm_loja}.`
    });
    ioClientConnect.emit('send notify', {
      room: `id_usuario${usuario.id}`,
      data: notification
    });

    const createQuotationTemplate = _path.default.resolve(__dirname, '..', 'views', 'quotation_create.hbs'); // eslint-disable-next-line no-await-in-loop


    this.mailProvider.sendMail({
      to: {
        name: quotation.emitente,
        email: quotation.emitente_email
      },
      subject: '[BATEU] Cotação alterada',
      templateData: {
        file: createQuotationTemplate,
        variable: {
          title: 'Cotação alterada!',
          text_info: `O item ${budgetItem.descricao_peca} da sua cotação ${quotation.identificador_cotacao} teve uma alteração pela loja ${quotation.loja.nm_loja}. Para mais detalhes, acesse o Bateu.`
        }
      }
    }).catch(error => {
      console.log(error);
    });
    return budgetItem;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = UpdateValueItemQuotationProcessService;