"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _common = _interopRequireDefault(require("../../../../../shared/utils/implementations/common"));

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

class BudgetsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Budget.default);
  }

  async create(data) {
    const budget = this.ormRepository.create({ ...data,
      dh_inc: new Date()
    });
    await this.ormRepository.save(budget);
    return budget;
  }

  async find({
    id_loja,
    id_estabelecimento,
    id_conta
  }, {
    search,
    page,
    pageSize
  }) {
    const searchSplit = search ? search.split(';') : [];
    const findFilters = new _common.default(searchSplit);
    let where = 'true '; // Se for filtro avançado, procurar por cada campos

    if (searchSplit.length > 1) {
      where += `and budget.emitente like '%${findFilters.findSearch('emitente')}%' and
      budget.emitente_email like '%${findFilters.findSearch('emitente_email')}%' and
      budget.emitente_telefone like '%${findFilters.findSearch('emitente_telefone')}%'`;
    } else if (searchSplit.length === 1) {
      where += `and (budget.emitente like '%${searchSplit[0]}%' or
      budget.emitente_email like '%${searchSplit[0]}%' or
      budget.emitente_telefone like '%${searchSplit[0]}%')`;
    }

    where += ` and budget.id_estabelecimento = ${id_estabelecimento} and budget.id_loja = ${id_loja}`;
    const budgets = await this.ormRepository.find({
      join: {
        alias: 'budget'
      },
      where: qb => {
        qb.where(where);
      },
      skip: page ? page - 1 : 0,
      take: pageSize + 1 || 11,
      relations: ['loja', 'estabelecimento', 'conta', 'items'],
      order: {
        id: 'DESC'
      }
    });
    return budgets;
  }

  async findByEmail(budget_email, {
    id_loja,
    id_estabelecimento,
    id_conta
  }, {
    page,
    pageSize
  }) {
    const budgets = await this.ormRepository.find({
      where: {
        emitente_email: budget_email // id_conta,

      },
      // skip: page ? page - 1 : 0,
      // take: pageSize + 1 || 11,
      relations: ['loja', 'estabelecimento', 'conta'],
      order: {
        id: 'DESC'
      }
    });
    return budgets;
  }

  async process({
    budget_id,
    isConfirm
  }, {
    id_conta,
    id_loja,
    id_estabelecimento
  }) {
    const budget = await this.ormRepository.findOne({
      where: {
        id: budget_id,
        id_estabelecimento,
        id_loja // id_conta,

      }
    }); // eslint-disable-next-line no-unused-expressions

    budget;
    budget.situacao = isConfirm ? SituationEnum.FULL_SALE : SituationEnum.CANCEL;
    await this.ormRepository.save(budget);
    return budget;
  }

  async findById(id, {
    id_loja,
    id_estabelecimento,
    id_conta
  }) {
    const budgets = await this.ormRepository.findOne({
      where: {
        id,
        id_estabelecimento,
        id_loja // id_conta,

      },
      relations: ['loja', 'estabelecimento', 'conta', 'items']
    });
    return budgets;
  }

}

exports.default = BudgetsRepository;