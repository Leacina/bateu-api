"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Model = _interopRequireDefault(require("../entities/Model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ModelsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Model.default);
  }

  async create({
    id_conta,
    id_estabelecimento,
    id_loja,
    id_marca,
    modelo
  }) {
    const brand = this.ormRepository.create({
      id_conta,
      id_estabelecimento: id_estabelecimento || 0,
      id_loja: id_loja || 0,
      id_marca,
      modelo,
      dh_inc: new Date()
    });
    await this.ormRepository.save(brand);
    return brand;
  }

  async delete(id) {
    await this.ormRepository.delete(id);
  }

  async save(data) {
    const model = await this.ormRepository.save(data);
    return model;
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
    id_loja,
    id_estabelecimento,
    id_conta
  }, {
    search,
    page,
    pageSize,
    ignorePage
  }) {
    const searchSplit = search ? search.split(';') : [];
    let where = '';

    if (searchSplit.length === 1) {
      where = `modelo like '%${searchSplit[0]}%'`;
    }

    const brands = await this.ormRepository.find({
      where: qb => {
        qb.where(where);
      },
      // eslint-disable-next-line no-nested-ternary
      skip: !ignorePage ? page ? page - 1 : 0 : 0,
      take: !ignorePage ? pageSize + 1 || 11 : 0,
      relations: ['marca', 'loja', 'estabelecimento', 'conta'],
      order: !ignorePage ? {
        id: 'DESC'
      } : {
        modelo: 'ASC'
      }
    });
    return brands;
  }

  async findByBrand(id_marca) {
    const brands = await this.ormRepository.find({
      where: {
        id_marca
      },
      order: {
        modelo: 'ASC'
      }
    });
    return brands;
  }

}

var _default = ModelsRepository;
exports.default = _default;