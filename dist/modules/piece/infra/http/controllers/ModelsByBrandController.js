"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListModelByBrandService = _interopRequireDefault(require("../../../services/model/ListModelByBrandService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ModelsController {
  async show(request, response) {
    const {
      id
    } = request.params;

    const listModelByBrandService = _tsyringe.container.resolve(_ListModelByBrandService.default);

    const models = await listModelByBrandService.execute(Number(id));
    return response.json(models);
  }

}

exports.default = ModelsController;