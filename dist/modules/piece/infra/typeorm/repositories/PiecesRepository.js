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
    pageSize,
    ignorePage,
    ignoreEstablishment
  }) {
    const where = `${this.getWhere(search)}`;
    const pieces = await this.ormRepository.find({
      join: {
        alias: 'piece'
      },
      where: qb => {
        qb.where( // eslint-disable-next-line prefer-template
        where + (ignoreEstablishment ? ' ' : ` and piece.id_estabelecimento = ${id_estabelecimento} and piece.id_loja = ${id_loja}`));
      },
      // eslint-disable-next-line no-nested-ternary
      skip: !ignorePage ? page ? page - 1 : 0 : 0,
      take: !ignorePage ? pageSize + 1 || 11 : 0,
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

  async findByCategory(id, cidade, {
    id_estabelecimento,
    id_loja
  }, {
    page,
    pageSize,
    ignoreEstablishment,
    ignorePage
  }) {
    // eslint-disable-next-line no-param-reassign
    ignorePage = true;
    let where = '';
    where = `piece.id_categoria = ${id}`; // Se for por cidade é uma customização do APP.

    if (cidade) {
      where = 'true';

      if (this.getIdAppCategory(id) !== '') {
        where += ` and categoria.categoria like '%${this.getIdAppCategory(id)}%'`;
      }

      if (cidade.toUpperCase() !== 'TODAS') {
        where += ` and loja.cidade like '%${cidade}%'`;
      }
    } // Se possuir filtro por cidade


    if (id_estabelecimento > 0) {
      where += ` and piece.id_estabelecimento = ${id_estabelecimento}`;
    }

    if (id_loja > 0) {
      where += ` and piece.id_loja = ${id_loja}`;
    }

    const pieces = await this.ormRepository.find({
      join: {
        alias: 'piece',
        innerJoin: {
          estabelecimento: 'piece.estabelecimento',
          loja: 'piece.loja',
          categoria: 'piece.categoria'
        }
      },
      where: qb => {
        qb.where(where);
      },
      // eslint-disable-next-line no-nested-ternary
      skip: !ignorePage ? page ? page - 1 : 0 : 0,
      take: !ignorePage ? pageSize + 1 || 11 : 0,
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

  getIdAppCategory(id) {
    // DESTAQUE(1, "Promocional"),
    // DIANTEIRA(2, "Dianteira"),
    // MEIO(3, "Laterais"),
    // TRASEIRO(4, "Traseira"),
    // OUTRA(5, "Outra"),
    // INTERIOR(6, "Interior"),
    // SUCATA(7, "Sucata");
    switch (id) {
      case 2:
        return 'Frente';

      case 3:
        return 'Laterais';

      case 4:
        return 'Traseira';

      case 5:
        return 'Outra';

      case 6:
        return 'Interior';

      case 7:
        return 'Sucata';

      default:
        return '';
    }
  }

}

var _default = PiecesRepository;
exports.default = _default;