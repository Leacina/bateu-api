"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Perfil = _interopRequireDefault(require("../entities/Perfil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PerfilRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Perfil.default);
  }

  async create({
    nm_menu,
    tp_perfil
  }) {
    const perfil = this.ormRepository.create({
      nm_menu,
      tp_perfil,
      cd_perfil: 0,
      dh_inc: new Date()
    });
    await this.ormRepository.save(perfil);
    return perfil;
  }

  async findById(id) {
    const perfil = await this.ormRepository.findOne({
      where: {
        id
      }
    });
    return perfil;
  }

  async save(perfil) {
    const perfilSave = await this.ormRepository.save(perfil);
    return perfilSave;
  }

  async find({
    search,
    page,
    pageSize
  }) {
    const searchSplit = search ? search.split(';') : [];
    let where = '';

    if (searchSplit.length === 1) {
      where = `tp_perfil like '%${searchSplit[0]}%'`;
    }

    const perfils = await this.ormRepository.find({
      where: qb => {
        qb.where(where);
      },
      skip: page,
      take: pageSize,
      order: {
        id: 'DESC'
      }
    });
    return perfils;
  }

}

var _default = PerfilRepository;
exports.default = _default;