"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _BudgetItem = _interopRequireDefault(require("../entities/BudgetItem"));

var _Budget = _interopRequireDefault(require("../entities/Budget"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line no-shadow
var SituationEnum;

(function (SituationEnum) {
  SituationEnum["CANCEL"] = "C";
  SituationEnum["FULL_SALE"] = "VI";
  SituationEnum["PARTIAL_SALE"] = "VP";
  SituationEnum["PENDING"] = "P";
})(SituationEnum || (SituationEnum = {}));

class BudgetItemsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepositoryBudget = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_BudgetItem.default);
    this.ormRepositoryBudget = (0, _typeorm.getRepository)(_Budget.default);
  }

  async create(data) {
    const budgetItem = this.ormRepository.create(data);
    await this.ormRepository.save(budgetItem);
    return budgetItem;
  }

  async sum(budget_id) {
    const budgetItems = await this.ormRepository.find({
      where: {
        id_orcamento: budget_id
      }
    });
    return budgetItems.reduce((acumulador, current_value) => {
      return Number(acumulador) + Number(current_value.valor);
    }, 0);
  }

  async find(budget_id, {
    id_loja,
    id_estabelecimento,
    id_conta
  }, {
    page,
    pageSize
  }) {
    const budgetItems = await this.ormRepository.find({
      where: {
        id_orcamento: budget_id
      },
      skip: page ? page - 1 : 0,
      take: pageSize + 1 || 11,
      relations: ['orcamento', 'peca', 'conta'],
      order: {
        id: 'DESC'
      }
    });
    return budgetItems;
  }

  async process({
    budget_item_id,
    isConfirm
  }) {
    const budgetItem = await this.ormRepository.findOne({
      where: {
        id: budget_item_id // id_conta,

      }
    }); // Altera estado produto

    budgetItem.situacao = isConfirm ? 'Confirmado' : 'Cancelado'; // Save

    await this.ormRepository.save(budgetItem); // Busca para verificar se todos estão cancelados/confirmados/pendentes

    const budgetItems = await this.ormRepository.find({
      where: {
        id_orcamento: budgetItem.id_orcamento
      }
    }); // Busca todos os itens cancelados

    const cancel_sale = budgetItems.filter(item => {
      return item.situacao === 'Cancelado';
    }); // Busca todos os itens pendentes

    const pending = budgetItems.filter(item => {
      return item.situacao === 'Pendente';
    }); // Busca o orçamento para alterar a situação

    const budget = await this.ormRepositoryBudget.findOne({
      where: {
        id: budgetItem.id_orcamento
      }
    }); // Somentee muda a situação se não tiver nada pendente

    if (pending.length === 0) {
      // Se todos estiverem cancelados, mostra como cancelado a venda
      if (cancel_sale.length === budgetItems.length) {
        budget.situacao = SituationEnum.CANCEL;
      } // Se possuir somente alguns cancelados e nenhum pendente
      // foi uma venda parcial
      else if (cancel_sale.length > 0) {
          budget.situacao = SituationEnum.PARTIAL_SALE;
        } // Se for vendido tudo, venda integral
        else {
            budget.situacao = SituationEnum.FULL_SALE;
          }
    } else {
      budget.situacao = SituationEnum.PENDING;
    } // Save


    await this.ormRepositoryBudget.save(budget);
    return budgetItem;
  }

}

exports.default = BudgetItemsRepository;