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
      dh_inc: new Date()
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

}

exports.default = QuotationItemsRepository;