"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IEstablishmentsRepository = _interopRequireDefault(require("../../establishment/repositories/IEstablishmentsRepository"));

var _IShopsRepository = _interopRequireDefault(require("../../establishment/repositories/IShopsRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var yup = _interopRequireWildcard(require("yup"));

var _IPiecesRepository = _interopRequireDefault(require("../../piece/repositories/IPiecesRepository"));

var _IMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/models/IMailProvider"));

var _path = _interopRequireDefault(require("path"));

var _INotificationsRepository = _interopRequireDefault(require("../../users/repositories/INotificationsRepository"));

var _socket = _interopRequireDefault(require("socket.io-client"));

var _IUserRepository = _interopRequireDefault(require("../../users/repositories/IUserRepository"));

var _IQuotationsRepository = _interopRequireDefault(require("../repositories/IQuotationsRepository"));

var _IQuotationItemsRepository = _interopRequireDefault(require("../repositories/IQuotationItemsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ioClientConnect = (0, _socket.default)('https://bateuweb.com.br/', {
  transports: ['websocket'],
  upgrade: false
});
let CreateQuotationService = ( // interface IResponse {
//  cotacao: Quotation;
//  itens: QuotationItem[];
// }
_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('QuotationsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('QuotationItemsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('PiecesRepository')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('EstablishmentsRepository')(target, undefined, 3);
}, _dec6 = function (target, key) {
  return (0, _tsyringe.inject)('ShopsRepository')(target, undefined, 4);
}, _dec7 = function (target, key) {
  return (0, _tsyringe.inject)('MailProvider')(target, undefined, 5);
}, _dec8 = function (target, key) {
  return (0, _tsyringe.inject)('NotificationsRepository')(target, undefined, 6);
}, _dec9 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 7);
}, _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", [typeof _IQuotationsRepository.default === "undefined" ? Object : _IQuotationsRepository.default, typeof _IQuotationItemsRepository.default === "undefined" ? Object : _IQuotationItemsRepository.default, typeof _IPiecesRepository.default === "undefined" ? Object : _IPiecesRepository.default, typeof _IEstablishmentsRepository.default === "undefined" ? Object : _IEstablishmentsRepository.default, typeof _IShopsRepository.default === "undefined" ? Object : _IShopsRepository.default, typeof _IMailProvider.default === "undefined" ? Object : _IMailProvider.default, typeof _INotificationsRepository.default === "undefined" ? Object : _INotificationsRepository.default, typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = _dec9(_class = _dec10(_class = _dec11(_class = class CreateQuotationService {
  constructor(quotationsRepository, quotationItemsRepository, piecesRepository, establishmentsRepository, shopsRepository, mailProvider, notificationsRepository, usersRepository) {
    this.quotationsRepository = quotationsRepository;
    this.quotationItemsRepository = quotationItemsRepository;
    this.piecesRepository = piecesRepository;
    this.establishmentsRepository = establishmentsRepository;
    this.shopsRepository = shopsRepository;
    this.mailProvider = mailProvider;
    this.notificationsRepository = notificationsRepository;
    this.usersRepository = usersRepository;
  }

  async execute(user_id, {
    emitente,
    emitente_email,
    emitente_telefone,
    identificador_cotacao,
    cidades,
    lojas
  }, items) {
    // Validações necessárias para criar o usuário
    const schemaItems = yup.array().of(yup.object().shape({
      descricao_peca: yup.string().nullable().required('Existem produtos sem descrição'),
      quantidade_solicitada: yup.number().required('Existem produtos sem quantidade')
    }));
    const schema = yup.object().shape({
      emitente: yup.string().nullable().required('Emitente não informado'),
      identificador_cotacao: yup.string().nullable().required('Identificador da cotação não informado')
    }); // Caso houver algum erro retorna com status 422

    await schemaItems.validate(items).catch(err => {
      throw new _AppError.default(err.message, 422);
    });
    await schema.validate({
      emitente,
      emitente_email,
      emitente_telefone,
      identificador_cotacao
    }).catch(err => {
      throw new _AppError.default(err.message, 422);
    });

    if (!cidades) {
      throw new _AppError.default('Nenhuma cidade selecionada para realizar a cotação', 422);
    }

    const user = await this.usersRepository.findById(user_id);

    if (user) {
      if (user.ds_login === 'administrador@bateu.com.br') {
        throw new _AppError.default('Realize o login para criar a cotação!', 401);
      }
    }

    const lojasSplit = lojas.split(';'); // eslint-disable-next-line no-plusplus

    for (let i = 0; i < lojasSplit.length; i++) {
      const search = `nm_loja:${lojasSplit[i]};`; // eslint-disable-next-line no-await-in-loop

      const shops = await this.shopsRepository.find({
        search
      }); // eslint-disable-next-line no-plusplus

      for (let x = 0; x < shops.length; x++) {
        // eslint-disable-next-line no-await-in-loop
        const quotation = await this.quotationsRepository.create({
          emitente,
          emitente_telefone,
          emitente_email,
          id_estabelecimento: Number(shops[x].id_estabelecimento),
          id_loja: Number(shops[x].id),
          situacao: 'P',
          identificador_cotacao
        });
        const quotationItems = [];
        items.map(async item => {
          const {
            descricao_peca,
            quantidade_solicitada,
            condicao_peca,
            observacao
          } = item;
          quotationItems.push({
            descricao_peca,
            quantidade_peca: Number(quantidade_solicitada),
            identificador_cotacao,
            id_cotacao: Number(quotation.id),
            situacao: 'Pendente',
            dh_inc: new Date(),
            condicao_peca,
            observacao
          });
        }); // eslint-disable-next-line no-await-in-loop

        await this.quotationItemsRepository.create(quotationItems);

        const createQuotationTemplate = _path.default.resolve(__dirname, '..', 'views', 'quotation_create.hbs'); // eslint-disable-next-line no-await-in-loop


        const notification = await this.notificationsRepository.create({
          id_cotacao: Number(quotation.id),
          id_loja: Number(shops[x].id),
          id_usuario: 0,
          mensagem: `Nova cotação criada por ${emitente}`
        });
        ioClientConnect.emit('send notify', {
          room: `id_loja${shops[x].id}`,
          data: notification
        }); // eslint-disable-next-line no-await-in-loop

        this.mailProvider.sendMail({
          to: {
            name: shops[x].nm_loja,
            email: shops[x].email
          },
          subject: '[BATEU] Solicitação de cotação',
          templateData: {
            file: createQuotationTemplate,
            variable: {
              title: 'Nova solicitação de cotação',
              text_info: `Você tem uma nova cotação disponível solicitada por ${emitente}. Para mais informação, acesse o portal com um usuário da loja.`
            }
          }
        }).catch(error => {
          console.log(error);
        });
      }
    }

    return 'Cotação criada com sucesso';
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = CreateQuotationService;