"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Brand = _interopRequireDefault(require("../entities/Brand"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BrandsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Brand.default);
  }

  async create({
    id_conta,
    id_estabelecimento,
    id_loja,
    marca,
    pais
  }) {
    const brand = this.ormRepository.create({
      id_conta,
      id_estabelecimento: id_estabelecimento || 0,
      id_loja: id_loja || 0,
      marca,
      pais,
      dh_inc: new Date()
    });
    await this.ormRepository.save(brand);
    return brand;
  }

  async delete(id) {
    await this.ormRepository.delete(id);
  }

  async save(data) {
    const brand = await this.ormRepository.save(data);
    return brand;
  }

  async findByID(id, id_conta) {
    const brand = await this.ormRepository.findOne({
      where: {
        id // id_conta,

      }
    });
    return brand;
  }

  async find({
    id_conta,
    id_estabelecimento,
    id_loja
  }, {
    search,
    page,
    pageSize,
    ignorePage
  }) {
    const searchSplit = search ? search.split(';') : [];
    let where = '';

    if (searchSplit.length === 1) {
      where = `marca like '%${searchSplit[0]}%'`;
    }

    const brands = await this.ormRepository.find({
      where: qb => {
        qb.where(where);
      },
      // eslint-disable-next-line no-nested-ternary
      skip: !ignorePage ? page ? page - 1 : 0 : 0,
      take: !ignorePage ? pageSize + 1 || 11 : 0,
      relations: ['loja', 'estabelecimento', 'conta'],
      order: !ignorePage ? {
        id: 'DESC'
      } : {
        marca: 'ASC'
      }
    });
    return brands;
  }

}

var _default = BrandsRepository;
exports.default = _default;