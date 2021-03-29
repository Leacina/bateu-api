"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Category = _interopRequireDefault(require("../entities/Category"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CategoriesRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Category.default);
  }

  async create({
    categoria,
    id_conta
  }) {
    const brand = this.ormRepository.create({
      categoria,
      id_conta,
      dh_inc: new Date()
    });
    await this.ormRepository.save(brand);
    return brand;
  }

  async delete(id) {
    await this.ormRepository.delete(id);
  }

  async save(data) {
    const category = await this.ormRepository.save(data);
    return category;
  }

  async findByID(id, id_conta) {
    const category = await this.ormRepository.findOne({
      where: {
        id,
        id_conta
      }
    });
    return category;
  }

  async find(id_conta, {
    page,
    pageSize,
    ignorePage
  }) {
    const categories = await this.ormRepository.find({
      where: !id_conta || Number(id_conta) === 0 ? {} : {
        id_conta
      },
      // eslint-disable-next-line no-nested-ternary
      skip: !ignorePage ? page ? page - 1 : 0 : 0,
      take: !ignorePage ? pageSize + 1 || 11 : 0,
      relations: ['conta'],
      order: !ignorePage ? {
        id: 'DESC'
      } : {
        categoria: 'ASC'
      }
    });
    return categories;
  }

}

var _default = CategoriesRepository;
exports.default = _default;