"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _common = _interopRequireDefault(require("../../../../../shared/utils/implementations/common"));

var _Establishment = _interopRequireDefault(require("../entities/Establishment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EstablishmentRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Establishment.default);
  }

  async findById(id) {
    const establishment = await this.ormRepository.findOne(id);
    return establishment;
  }

  async findByAccountId(id) {
    const establishment = await this.ormRepository.find({
      where: {
        id_conta: id
      },
      order: {
        id: 'DESC'
      }
    });
    return establishment;
  }

  async find({
    search,
    page,
    pageSize
  }) {
    const searchSplit = search ? search.split(';') : [];
    const findFilters = new _common.default(searchSplit);
    let where = ''; // Se for filtro avançado, procurar por cada campos

    if (searchSplit.length > 1) {
      where = `cidade like '%${findFilters.findSearch('cidade')}%' and
      nm_estabelecimento like '%${findFilters.findSearch('nm_estabelecimento')}%' and
      responsavel like '%${findFilters.findSearch('responsavel')}%'`;
    } else if (searchSplit.length === 1) {
      where = `cidade like '%${searchSplit[0]}%' or
      nm_estabelecimento like '%${searchSplit[0]}%' or
      responsavel like '%${searchSplit[0]}%'`;
    }

    const establishment = await this.ormRepository.find({
      where: qb => {
        qb.where(where);
      },
      skip: page,
      take: pageSize,
      order: {
        id: 'DESC'
      }
    });
    return establishment;
  }

  async create(data) {
    const establishmentObject = { ...data,
      dh_inc: new Date()
    };
    const establishment = this.ormRepository.create(establishmentObject);
    await this.ormRepository.save(establishment);
    return establishment;
  }

  async save(establishment) {
    return this.ormRepository.save(establishment);
  }

}

exports.default = EstablishmentRepository;