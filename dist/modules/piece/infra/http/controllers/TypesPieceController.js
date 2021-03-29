"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListTypesPieceRepository = _interopRequireDefault(require("../../../services/ListTypesPieceRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ModelsController {
  async index(request, response) {
    const listTypesPieceRepository = _tsyringe.container.resolve(_ListTypesPieceRepository.default);

    const {
      page,
      pageSize
    } = request.query;
    const types = await listTypesPieceRepository.execute({
      page: Number(page),
      pageSize: Number(pageSize)
    });
    return response.json(types);
  }

}

exports.default = ModelsController;