"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListPieceBySpotlightService = _interopRequireDefault(require("../../../services/ListPieceBySpotlightService"));

var _UpdatePieceSpotlight = _interopRequireDefault(require("../../../services/UpdatePieceSpotlight"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PiecesController {
  async show(request, response) {
    const {
      page,
      pageSize,
      search
    } = request.query;

    const listPieceBySpotlightService = _tsyringe.container.resolve(_ListPieceBySpotlightService.default);

    const pieces = await listPieceBySpotlightService.execute(Number(request.user.id), {
      search: search ? String(search) : '',
      page: Number(page),
      pageSize: Number(pageSize)
    });
    return response.json(pieces);
  }

  async update(request, response) {
    const {
      id,
      peca_destaque
    } = request.params;

    const updatePieceSpotlight = _tsyringe.container.resolve(_UpdatePieceSpotlight.default);

    const brand = await updatePieceSpotlight.execute(Number(id), Number(request.user.id), Number(peca_destaque));
    return response.json(brand);
  }

}

exports.default = PiecesController;