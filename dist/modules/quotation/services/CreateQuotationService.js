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

var _IQuotationsRepository = _interopRequireDefault(require("../repositories/IQuotationsRepository"));

var _IQuotationItemsRepository = _interopRequireDefault(require("../repositories/IQuotationItemsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
}, _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [typeof _IQuotationsRepository.default === "undefined" ? Object : _IQuotationsRepository.default, typeof _IQuotationItemsRepository.default === "undefined" ? Object : _IQuotationItemsRepository.default, typeof _IPiecesRepository.default === "undefined" ? Object : _IPiecesRepository.default, typeof _IEstablishmentsRepository.default === "undefined" ? Object : _IEstablishmentsRepository.default, typeof _IShopsRepository.default === "undefined" ? Object : _IShopsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = class CreateQuotationService {
  constructor(quotationsRepository, quotationItemsRepository, piecesRepository, establishmentsRepository, shopsRepository) {
    this.quotationsRepository = quotationsRepository;
    this.quotationItemsRepository = quotationItemsRepository;
    this.piecesRepository = piecesRepository;
    this.establishmentsRepository = establishmentsRepository;
    this.shopsRepository = shopsRepository;
  }

  async execute(user_id, {
    emitente,
    emitente_email,
    emitente_telefone,
    identificador_cotacao
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
    const shops = await this.shopsRepository.find({
      search: ''
    }); // eslint-disable-next-line no-plusplus

    for (let i = 0; i < shops.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const quotation = await this.quotationsRepository.create({
        emitente,
        emitente_telefone,
        emitente_email,
        id_estabelecimento: Number(shops[i].id_estabelecimento),
        id_loja: Number(shops[i].id),
        situacao: 'P',
        identificador_cotacao
      });
      const quotationItems = [];
      items.map(async item => {
        const {
          descricao_peca,
          quantidade_solicitada
        } = item;
        quotationItems.push({
          descricao_peca,
          quantidade_peca: Number(quantidade_solicitada),
          identificador_cotacao,
          id_cotacao: Number(quotation.id),
          situacao: 'Pendente',
          dh_inc: new Date()
        });
      }); // eslint-disable-next-line no-await-in-loop

      await this.quotationItemsRepository.create(quotationItems);
    }

    return 'Cotação criada com sucesso';
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = CreateQuotationService;