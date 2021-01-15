"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _common = _interopRequireDefault(require("../../../../../shared/utils/implementations/common"));

var _User = _interopRequireDefault(require("../entities/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.searchSplit = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_User.default);
  }

  async create({
    ds_login,
    tp_usuario,
    ds_senha,
    telefone,
    nm_usuario,
    is_ativo,
    id_perfil,
    id_loja,
    id_estabelecimento,
    id_conta
  }) {
    const user = this.ormRepository.create({
      ds_login,
      tp_usuario,
      ds_senha,
      telefone,
      nm_usuario,
      is_ativo,
      id_perfil,
      id_loja,
      id_estabelecimento,
      id_conta
    });
    await this.ormRepository.save(user);
    return user;
  }

  async findByEmail(email) {
    const user = await this.ormRepository.findOne({
      where: {
        ds_login: email
      }
    });
    return user;
  }

  async findById(id) {
    const user = await this.ormRepository.findOne({
      where: {
        id
      }
    });
    return user;
  }

  async find(logist, {
    page,
    pageSize,
    search
  }) {
    this.searchSplit = search ? search.split(';') : [];
    const user = await this.ormRepository.find({
      join: this.getJoin(logist),
      where: qb => {
        qb.where(this.getWhere(logist));
      },
      skip: page ? page - 1 : 0,
      take: pageSize + 1 || 11,
      relations: ['loja', 'estabelecimento', 'conta', 'perfil'],
      order: {
        id: 'DESC'
      }
    });

    if (logist) {
      return user.filter(model => model.id_estabelecimento !== null && String(model.id_estabelecimento) !== '0');
    }

    return user.filter(model => model.id_estabelecimento === null || String(model.id_estabelecimento) === '0');
  }

  async save(user) {
    const userSave = await this.ormRepository.save(user);
    return userSave;
  }
  /** UTILS */


  getWhere(logist) {
    const findFilters = new _common.default(this.searchSplit);
    let where = 'true ';

    if (logist) {
      // Se for filtro avançado, procurar por cada campos
      if (this.searchSplit.length > 1) {
        where = `and estabelecimento.nm_estabelecimento like '%${findFilters.findSearch('nm_estabelecimento')}%' and
      loja.nm_loja like '%${findFilters.findSearch('nm_loja')}%' and
      nm_usuario like '%${findFilters.findSearch('nm_usuario')}%' and ds_login like '%${findFilters.findSearch('ds_login')}%'`;
      } else if (this.searchSplit.length === 1) {
        where = `and estabelecimento.nm_estabelecimento like '%${this.searchSplit[0]}%' or
      loja.nm_loja like '%${this.searchSplit[0]}%' or
      nm_usuario like '%${this.searchSplit[0]}%' or ds_login like '%${this.searchSplit[0]}%'`;
      }

      return `${where}`;
    }

    if (this.searchSplit.length > 1) {
      where = `nm_usuario like '%${findFilters.findSearch('nm_usuario')}%' and ds_login like '%${findFilters.findSearch('ds_login')}%'`;
    } else if (this.searchSplit.length === 1) {
      where = `nm_usuario like '%${this.searchSplit[0]}%' or ds_login like '%${this.searchSplit[0]}%'`;
    }

    return `${where} and (user.id_estabelecimento = null or user.id_estabelecimento = 0)`;
  }

  getJoin(logist) {
    if (logist) {
      return {
        alias: 'user',
        innerJoin: {
          estabelecimento: 'user.estabelecimento',
          loja: 'user.loja'
        }
      };
    }

    return {
      alias: 'user'
    };
  }

}

var _default = UsersRepository;
exports.default = _default;