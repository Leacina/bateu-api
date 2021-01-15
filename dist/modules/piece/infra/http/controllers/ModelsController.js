"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateModelService = _interopRequireDefault(require("../../../services/model/CreateModelService"));

var _DeleteModelService = _interopRequireDefault(require("../../../services/model/DeleteModelService"));

var _ListModelByIDService = _interopRequireDefault(require("../../../services/model/ListModelByIDService"));

var _ListModelsService = _interopRequireDefault(require("../../../services/model/ListModelsService"));

var _UpdateModelService = _interopRequireDefault(require("../../../services/model/UpdateModelService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ModelsController {
  async create(request, response) {
    const {
      id_loja,
      id_estabelecimento,
      id_marca,
      modelo
    } = request.body;

    const createModels = _tsyringe.container.resolve(_CreateModelService.default);

    const model = await createModels.execute({
      id_loja,
      id_estabelecimento,
      id_marca,
      modelo,
      user_id: Number(request.user.id)
    });
    return response.json(model);
  }

  async index(request, response) {
    const {
      id
    } = request.params;

    const listModelById = _tsyringe.container.resolve(_ListModelByIDService.default);

    const model = await listModelById.execute({
      id_model: Number(id),
      user_id: Number(request.user.id)
    });
    return response.json(model);
  }

  async show(request, response) {
    const {
      page,
      pageSize,
      search
    } = request.query;

    const listModel = _tsyringe.container.resolve(_ListModelsService.default);

    const models = await listModel.execute(Number(request.user.id), {
      search: search ? String(search) : '',
      page: Number(page),
      pageSize: Number(pageSize)
    });
    return response.json(models);
  }

  async delete(request, response) {
    const {
      id
    } = request.params;

    const deleteModel = _tsyringe.container.resolve(_DeleteModelService.default);

    await deleteModel.execute({
      id: Number(id),
      user_id: Number(request.user.id)
    });
    return response.status(200).send();
  }

  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      id_marca,
      modelo
    } = request.body;

    const updateModel = _tsyringe.container.resolve(_UpdateModelService.default);

    const model = await updateModel.execute({
      model_name: modelo,
      brand_id: Number(id_marca),
      model_id: Number(id),
      user_id: Number(request.user.id)
    });
    return response.json(model);
  }

}

exports.default = ModelsController;