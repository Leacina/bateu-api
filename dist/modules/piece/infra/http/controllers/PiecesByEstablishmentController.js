"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListPiecesByEstablishmentService = _interopRequireDefault(require("../../../services/ListPiecesByEstablishmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PiecesByShopController {
  async show(request, response) {
    const {
      id
    } = request.params;
    const {
      page,
      pageSize
    } = request.query;

    const listPieceByEstablishment = _tsyringe.container.resolve(_ListPiecesByEstablishmentService.default);

    const piece = await listPieceByEstablishment.execute({
      id_estabelecimento: Number(id),
      filter: {
        page: Number(page),
        pageSize: Number(pageSize)
      },
      user_id: Number(request.user.id)
    });
    return response.json(piece);
  }

}

exports.default = PiecesByShopController;