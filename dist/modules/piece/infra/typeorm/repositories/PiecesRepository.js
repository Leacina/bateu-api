"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _common = _interopRequireDefault(require("../../../../../shared/utils/implementations/common"));

var _Piece = _interopRequireDefault(require("../entities/Piece"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PiecesRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Piece.default);
  }

  async create(data) {
    const piece = this.ormRepository.create({ ...data,
      dh_inc: new Date()
    });
    await this.ormRepository.save(piece);
    return piece;
  }

  async delete(id) {
    await this.ormRepository.delete(id);
  }

  async save(data) {
    const piece = await this.ormRepository.save(data);
    return piece;
  }

  async findByID(id, id_conta) {
    const piece = await this.ormRepository.findOne({
      where: {
        id
      }
    });
    return piece;
  }

  async find({
    id_conta,
    id_estabelecimento,
    id_loja
  }, {
    search,
    page,
    pageSize
  }) {
    const pieces = await this.ormRepository.find({
      join: {
        alias: 'piece'
      },
      where: qb => {
        qb.where(`${this.getWhere(search)} and piece.id_estabelecimento = ${id_estabelecimento} and piece.id_loja = ${id_loja}`);
      },
      skip: page ? page - 1 : 0,
      take: pageSize + 1 || 11,
      relations: ['marca', 'loja', 'estabelecimento', 'conta', 'categoria', 'modelo'],
      order: {
        id: 'DESC'
      }
    });
    return pieces;
  }

  async findByShop({
    id_estabelecimento,
    id_loja
  }) {
    const pieces = await this.ormRepository.find({
      where: qb => {
        qb.where(`id_estabelecimento = ${id_estabelecimento} and id_loja = ${id_loja}`);
      },
      order: {
        id: 'DESC'
      }
    });
    return pieces;
  }

  async findBySpotlight({
    id_conta,
    id_estabelecimento,
    id_loja
  }, {
    search,
    page,
    pageSize
  }) {
    const searchSplit = search ? search.split(';') : [];
    const findFilters = new _common.default(searchSplit);
    let whereEstablishment = '';

    if (searchSplit.length > 1) {
      whereEstablishment = ` and piece.id_estabelecimento = ${findFilters.findSearch('id_estabelecimento')} and
      piece.id_loja = ${findFilters.findSearch('id_loja')}`;
    }

    const pieces = await this.ormRepository.find({
      join: {
        alias: 'piece'
      },
      where: qb => {
        qb.where(`${this.getWhere(search) + whereEstablishment} and piece.peca_destaque = 1`);
      },
      skip: page ? page - 1 : 0,
      take: pageSize + 1 || 11,
      relations: ['marca', 'loja', 'estabelecimento', 'conta', 'categoria', 'modelo'],
      order: {
        id: 'DESC'
      }
    });
    return pieces;
  }

  async findByCategory(id, id_conta, {
    page,
    pageSize
  }) {
    const pieces = await this.ormRepository.find({
      where: {
        id_categoria: id
      },
      skip: page ? page - 1 : 0,
      take: pageSize + 1 || 11,
      relations: ['marca', 'loja', 'estabelecimento', 'conta', 'categoria', 'modelo'],
      order: {
        id: 'DESC'
      }
    });
    return pieces;
  }

  async count({
    id_conta,
    id_estabelecimento,
    id_loja
  }) {
    const count = await this.ormRepository.count({
      where: {
        id_estabelecimento,
        id_loja
      }
    });
    return count;
  }

  getWhere(search) {
    const searchSplit = search ? search.split(';') : [];
    const findFilters = new _common.default(searchSplit);
    let where = 'true '; // Se for filtro avançado, procurar por cada campos

    if (searchSplit.length > 1) {
      where += `and piece.nm_peca like '%${findFilters.findSearch('nm_peca')}%' and
      piece.descricao_peca like '%${findFilters.findSearch('descricao_peca')}%'`;
    } else if (searchSplit.length === 1) {
      where += `and (piece.nm_peca like '%${searchSplit[0]}%' or
      piece.descricao_peca like '%${searchSplit[0]}%')`;
    }

    return where;
  }

}

var _default = PiecesRepository;
exports.default = _default;