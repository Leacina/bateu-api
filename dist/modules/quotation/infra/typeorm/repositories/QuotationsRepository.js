"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _common = _interopRequireDefault(require("../../../../../shared/utils/implementations/common"));

var _Quotation = _interopRequireDefault(require("../entities/Quotation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class QuotationItemsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Quotation.default);
  }

  async create(data) {
    const quotation = this.ormRepository.create({ ...data,
      dh_inc: new Date(),
      is_visualizado_cliente: 1
    });
    await this.ormRepository.save(quotation);
    return quotation;
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
      where += `and quotation.emitente like '%${findFilters.findSearch('emitente')}%' and
      quotation.identificador_cotacao like '%${findFilters.findSearch('identificador_cotacao')}%' and
      quotation.emitente_telefone like '%${findFilters.findSearch('emitente_telefone')}%'`;
    } else if (searchSplit.length === 1) {
      where += `and (quotation.emitente like '%${searchSplit[0]}%' or
      quotation.emitente_email like '%${searchSplit[0]}%' or
      quotation.emitente_telefone like '%${searchSplit[0]}%')`;
    }

    where += ` and quotation.id_estabelecimento = ${id_estabelecimento} and quotation.id_loja = ${id_loja}`;
    const quotations = await this.ormRepository.find({
      join: {
        alias: 'quotation'
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
    return quotations;
  }

  async findByEmail(budget_email, {
    id_loja,
    id_estabelecimento,
    id_conta
  }, {
    page,
    pageSize,
    search
  }, isViewAll) {
    const searchSplit = search ? search.split(';') : [];
    const findFilters = new _common.default(searchSplit);
    let where = 'true '; // Se for filtro avançado, procurar por cada campos

    if (searchSplit.length > 1) {
      where += `and quotation.identificador_cotacao like '%${findFilters.findSearch('identificador_cotacao')}%' and loja.nm_loja like '%${findFilters.findSearch('nm_loja')}%'`;
    } else if (searchSplit.length === 1) {
      where += `and (quotation.emitente like '%${searchSplit[0]}% or loja.nm_loja like '%${searchSplit[0]}%)'`;
    }

    where += ` and quotation.emitente_email = '${budget_email}'`;

    if (isViewAll === 1) {
      where += ` and quotation.is_visualizado_cliente = 1`;
    }

    const quotations = await this.ormRepository.find({
      join: {
        alias: 'quotation',
        leftJoin: {
          loja: 'quotation.loja'
        }
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
    return quotations;
  }

  async findById(id) {
    const quotation = await this.ormRepository.findOne({
      where: {
        id
      },
      relations: ['loja']
    });
    return quotation;
  }

  async processView(id, isView) {
    const quotation = await this.ormRepository.findOne({
      where: {
        id
      }
    }); // eslint-disable-next-line no-unused-expressions

    quotation; // Altera estado da cotação

    quotation.is_visualizado_cliente = isView; // Save

    await this.ormRepository.save(quotation);
    return quotation;
  }

}

exports.default = QuotationItemsRepository;