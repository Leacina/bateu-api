"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListEstablishmentByIDService = _interopRequireDefault(require("../../../services/ListEstablishmentByIDService"));

var _ListEstablishmentService = _interopRequireDefault(require("../../../services/ListEstablishmentService"));

var _CreateEstablishmentService = _interopRequireDefault(require("../../../services/CreateEstablishmentService"));

var _UpdateEstablishmentService = _interopRequireDefault(require("../../../services/UpdateEstablishmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentController {
  async index(request, response) {
    const {
      id
    } = request.params;

    const listEstablishment = _tsyringe.container.resolve(_ListEstablishmentByIDService.default);

    const establishments = await listEstablishment.execute(Number(id));
    return response.json(establishments);
  }

  async show(request, response) {
    const {
      page,
      pageSize,
      search
    } = request.query;

    const listEstablishmentService = _tsyringe.container.resolve(_ListEstablishmentService.default);

    const establishments = await listEstablishmentService.execute({
      search: search ? String(search) : '',
      page: Number(page),
      pageSize: Number(pageSize)
    });
    return response.json(establishments);
  }

  async create(request, response) {
    const {
      cnpj_cpf,
      razao_social,
      nm_estabelecimento,
      responsavel,
      telefone_responsavel,
      cidade,
      estado,
      quantidade_lojas
    } = request.body;

    const createEstablishment = _tsyringe.container.resolve(_CreateEstablishmentService.default);

    const establishment = await createEstablishment.execute({
      cnpj_cpf,
      razao_social,
      nm_estabelecimento,
      responsavel,
      telefone_responsavel,
      cidade,
      estado,
      quantidade_lojas
    }, Number(request.user.id));
    return response.json(establishment);
  }

  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      cnpj_cpf,
      razao_social,
      nm_estabelecimento,
      responsavel,
      telefone_responsavel,
      cidade,
      estado,
      quantidade_lojas
    } = request.body;

    const updateEstablishmentService = _tsyringe.container.resolve(_UpdateEstablishmentService.default);

    const establishment = await updateEstablishmentService.execute(Number(id), {
      cnpj_cpf,
      razao_social,
      nm_estabelecimento,
      responsavel,
      telefone_responsavel,
      cidade,
      estado,
      quantidade_lojas
    }, Number(request.user.id));
    return response.json(establishment);
  }

}

exports.default = AppointmentController;