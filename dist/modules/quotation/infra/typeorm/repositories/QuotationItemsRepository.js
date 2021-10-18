"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _QuotationItem = _interopRequireDefault(require("../entities/QuotationItem"));

var _Quotation = _interopRequireDefault(require("../entities/Quotation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line no-shadow
var SituationEnum;

(function (SituationEnum) {
  SituationEnum["CANCEL"] = "C";
  SituationEnum["FULL_SALE"] = "VI";
  SituationEnum["PARTIAL_SALE"] = "VP";
  SituationEnum["PENDING"] = "P";
})(SituationEnum || (SituationEnum = {}));

class QuotationItemsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepositoryQuotation = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_QuotationItem.default);
    this.ormRepositoryQuotation = (0, _typeorm.getRepository)(_Quotation.default);
  }

  async create(data) {
    const quotationItem = this.ormRepository.create(data);
    await this.ormRepository.save(quotationItem);
    return quotationItem;
  }

  async find(id_cotacao, {
    id_loja,
    id_estabelecimento,
    id_conta
  }, {
    page,
    pageSize
  }) {
    const quotationItems = await this.ormRepository.find({
      where: {
        id_cotacao
      },
      relations: ['cotacao', 'cotacao.loja', 'conta'],
      order: {
        id: 'DESC'
      }
    });
    return quotationItems;
  }

  async process({
    quotation_item_id,
    isConfirm
  }) {
    const quotationItem = await this.ormRepository.findOne({
      where: {
        id: quotation_item_id // id_conta,

      }
    }); // Altera estado produto

    quotationItem.situacao = isConfirm ? 'Confirmado' : 'Cancelado'; // Save

    await this.ormRepository.save(quotationItem); // Busca para verificar se todos estão cancelados/confirmados/pendentes

    const quotationItems = await this.ormRepository.find({
      where: {
        id_cotacao: quotationItem.id_cotacao
      }
    }); // Busca todos os itens cancelados

    const cancel_sale = quotationItems.filter(item => {
      return item.situacao === 'Cancelado';
    }); // Busca todos os itens pendentes

    const pending = quotationItems.filter(item => {
      return item.situacao === 'Pendente';
    }); // Busca a cotação para alterar a situação

    const quotation = await this.ormRepositoryQuotation.find({
      where: {
        id: quotationItem.id_cotacao
      }
    }); // Se encontrou alguma coisa, então ainda esta parcial... Pois existe items
    // a ser confirmado/cancelado ainda
    // eslint-disable-next-line no-plusplus

    for (let i = 0; i < quotation.length; i++) {
      // Somentee muda a situação se não tiver nada pendente
      if (pending.length === 0) {
        // Se todos estiverem cancelados, mostra como cancelado a venda
        if (cancel_sale.length === quotationItems.length) {
          quotation[i].situacao = SituationEnum.CANCEL;
        } // Se possuir somente alguns cancelados e nenhum pendente
        // foi uma venda parcial
        else if (cancel_sale.length > 0) {
            quotation[i].situacao = SituationEnum.PARTIAL_SALE;
          } // Se for vendido tudo, venda integral
          else {
              quotation[i].situacao = SituationEnum.FULL_SALE;
            }
      } else {
        quotation[i].situacao = SituationEnum.PENDING;
      }
    } // Save


    await this.ormRepositoryQuotation.save(quotation);
    return quotationItem;
  }

  async updateValue({
    id,
    value,
    condition,
    observation
  }) {
    const quotationItem = await this.ormRepository.findOne({
      where: {
        id // id_conta,

      }
    }); // eslint-disable-next-line no-unused-expressions

    quotationItem; // Altera estado produto

    quotationItem.valor_peca = value;
    quotationItem.condicao_peca = condition;
    quotationItem.observacao = observation; // Save

    await this.ormRepository.save(quotationItem);
    return quotationItem;
  }

  async sum(quotation_id) {
    const quotationItems = await this.ormRepository.find({
      where: {
        id_cotacao: quotation_id
      }
    });
    return quotationItems.reduce((acumulador, current_value) => {
      return Number(acumulador) + Number(current_value.valor_peca);
    }, 0);
  }

}

exports.default = QuotationItemsRepository;