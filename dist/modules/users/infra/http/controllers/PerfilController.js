"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreatePerfilService = _interopRequireDefault(require("../../../services/perfil/CreatePerfilService"));

var _ListPerfilByIDService = _interopRequireDefault(require("../../../services/perfil/ListPerfilByIDService"));

var _ListPerfilService = _interopRequireDefault(require("../../../services/perfil/ListPerfilService"));

var _UpdatePerfilService = _interopRequireDefault(require("../../../services/perfil/UpdatePerfilService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PerfilController {
  async create(request, response) {
    const createPerfilService = _tsyringe.container.resolve(_CreatePerfilService.default);

    const perfil = await createPerfilService.execute(request.body);
    return response.json(perfil);
  }

  async index(request, response) {
    const {
      id
    } = request.params;

    const listPerfilByIDService = _tsyringe.container.resolve(_ListPerfilByIDService.default);

    const perfil = await listPerfilByIDService.execute(Number(id));
    return response.json(perfil);
  }

  async update(request, response) {
    const {
      id
    } = request.params;

    const updatePerfilService = _tsyringe.container.resolve(_UpdatePerfilService.default);

    const perfil = await updatePerfilService.execute(Number(id), request.body);
    return response.json(perfil);
  }

  async show(request, response) {
    const {
      page,
      pageSize,
      search
    } = request.query;

    const listPerfilService = _tsyringe.container.resolve(_ListPerfilService.default);

    const perfil = await listPerfilService.execute({
      search: search ? String(search) : '',
      page: Number(page),
      pageSize: Number(pageSize)
    });
    return response.json(perfil);
  }

}

exports.default = PerfilController;