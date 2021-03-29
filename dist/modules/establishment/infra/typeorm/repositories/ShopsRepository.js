"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _common = _interopRequireDefault(require("../../../../../shared/utils/implementations/common"));

var _Shop = _interopRequireDefault(require("../entities/Shop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShopRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Shop.default);
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
      where = `shop.cidade like '%${findFilters.findSearch('cidade')}%' and
      shop.nm_loja like '%${findFilters.findSearch('nm_loja')}%' and
      estabelecimento.nm_estabelecimento like '%${findFilters.findSearch('estabelecimento')}%'`;
    } else if (searchSplit.length === 1) {
      where = `shop.cidade like '%${searchSplit[0]}%' or
      shop.nm_loja like '%${searchSplit[0]}%' or
      estabelecimento.nm_estabelecimento like '%${searchSplit[0]}%'`;
    }

    const shop = await this.ormRepository.find({
      relations: ['estabelecimento'],
      join: {
        alias: 'shop',
        innerJoin: {
          estabelecimento: 'shop.estabelecimento'
        }
      },
      where: qb => {
        qb.where(where);
      },
      skip: page,
      take: pageSize,
      order: {
        id: 'DESC'
      }
    });
    return shop;
  }

  async findById(id) {
    const shop = await this.ormRepository.findOne({
      where: {
        id
      },
      relations: ['estabelecimento']
    });
    return shop;
  }

  async findByEstablishmentId(id) {
    const shops = await this.ormRepository.find({
      where: {
        id_estabelecimento: id
      },
      relations: ['estabelecimento'],
      order: {
        id: 'DESC'
      }
    });
    return shops;
  }

  async findByAccountId(id) {
    const shop = await this.ormRepository.find({
      where: {
        id_conta: id
      }
    });
    return shop;
  }

  async create(data) {
    const shop = this.ormRepository.create({ ...data,
      dh_inc: new Date()
    });
    await this.ormRepository.save(shop);
    return shop;
  }

  async save(shop) {
    const shopModel = this.ormRepository.save(shop);
    return shopModel;
  }

}

exports.default = ShopRepository;