"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/models/IMailProvider"));

var _path = _interopRequireDefault(require("path"));

var _IBudgetItemsRepository = _interopRequireDefault(require("../repositories/IBudgetItemsRepository"));

var _IBudgetsRepository = _interopRequireDefault(require("../repositories/IBudgetsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateBudgetItemProcessService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('BudgetItemsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('BudgetsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('MailProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IBudgetItemsRepository.default === "undefined" ? Object : _IBudgetItemsRepository.default, typeof _IBudgetsRepository.default === "undefined" ? Object : _IBudgetsRepository.default, typeof _IMailProvider.default === "undefined" ? Object : _IMailProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class UpdateBudgetItemProcessService {
  constructor(budgetItemsRepository, budgetsRepository, mailProvider) {
    this.budgetItemsRepository = budgetItemsRepository;
    this.budgetsRepository = budgetsRepository;
    this.mailProvider = mailProvider;
  }

  async execute({
    budget_item_id,
    isConfirm
  }) {
    const budgetItem = await this.budgetItemsRepository.process({
      budget_item_id,
      isConfirm
    }); // Verifica se a cotação foi finalizada

    const budget = await this.budgetsRepository.findById(Number(budgetItem.id_orcamento), {
      id_conta: 0,
      id_estabelecimento: 0,
      id_loja: 0
    });

    if (budget) {
      // Se já foi confirmado envia o email
      if (budget.situacao === 'VI' || budget.situacao === 'VP') {
        const createQuotationTemplate = _path.default.resolve(__dirname, '..', 'views', 'budget_create.hbs'); // eslint-disable-next-line no-await-in-loop


        this.mailProvider.sendMail({
          to: {
            name: budget.emitente,
            email: budget.emitente_email
          },
          subject: '[BATEU] Orçamento finalizado',
          templateData: {
            file: createQuotationTemplate,
            variable: {
              title: 'Orçamento finalizado!',
              text_info: `Você tem um orçamento finalizada pela loja ${budget.loja.nm_loja}. Para mais detalhes, acesse o Bateu.`
            }
          }
        }).catch(error => {
          console.log(error);
        });
      }
    }

    return budgetItem;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = UpdateBudgetItemProcessService;