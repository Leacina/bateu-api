"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var yup = _interopRequireWildcard(require("yup"));

var _IPiecesRepository = _interopRequireDefault(require("../../piece/repositories/IPiecesRepository"));

var _IBudgetsRepository = _interopRequireDefault(require("../repositories/IBudgetsRepository"));

var _IBudgetItemsRepository = _interopRequireDefault(require("../repositories/IBudgetItemsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateBudgetService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('BudgetsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('BudgetItemsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('PiecesRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IBudgetsRepository.default === "undefined" ? Object : _IBudgetsRepository.default, typeof _IBudgetItemsRepository.default === "undefined" ? Object : _IBudgetItemsRepository.default, typeof _IPiecesRepository.default === "undefined" ? Object : _IPiecesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateBudgetService {
  constructor(budgetsRepository, budgetItemsRepository, piecesRepository) {
    this.budgetsRepository = budgetsRepository;
    this.budgetItemsRepository = budgetItemsRepository;
    this.piecesRepository = piecesRepository;
  }

  async execute(user_id, {
    emitente,
    emitente_email,
    emitente_telefone
  }, items) {
    // Validações necessárias para criar o usuário
    const schemaItems = yup.array().of(yup.object().shape({
      id_produto: yup.number().required('Existem produtos sem código'),
      quantidade_solicitada: yup.number().required('Existem produtos sem quantidade'),
      valor_orcamento: yup.number().required('Existe produto sem valor de orçamento')
    }));
    const schema = yup.object().shape({
      emitente: yup.string().nullable().required('Emitente não informado')
    }); // Caso houver algum erro retorna com status 422

    await schemaItems.validate(items).catch(err => {
      throw new _AppError.default(err.message, 422);
    });
    await schema.validate({
      emitente,
      emitente_email,
      emitente_telefone
    }).catch(err => {
      throw new _AppError.default(err.message, 422);
    });
    let pieceNotFound;
    items.map(async item => {
      const piece = await this.piecesRepository.findByID(Number(item.id_produto));

      if (!piece) {
        pieceNotFound = item.id_produto;
      }
    });

    if (pieceNotFound) {
      throw new _AppError.default(`Peça ${pieceNotFound} não encontrada`, 401);
    }

    const {
      id_estabelecimento,
      id_loja
    } = await this.piecesRepository.findByID(Number(items[0].id_produto));
    const budget = await this.budgetsRepository.create({
      emitente,
      emitente_telefone,
      emitente_email,
      id_estabelecimento,
      id_loja,
      situacao: 'P'
    });
    const budgetItems = [];
    items.map(async item => {
      const {
        id_produto,
        quantidade_solicitada,
        valor_orcamento
      } = item;
      budgetItems.push({
        id_peca: id_produto,
        quantidade: quantidade_solicitada,
        valor: valor_orcamento,
        id_orcamento: budget.id,
        situacao: 'Pendente'
      });
    });
    const itemsResult = await this.budgetItemsRepository.create(budgetItems);
    return {
      orcamento: budget,
      itens: itemsResult
    };
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = CreateBudgetService;