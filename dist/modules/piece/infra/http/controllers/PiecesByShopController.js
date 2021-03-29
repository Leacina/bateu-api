"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListPiecesByShopService = _interopRequireDefault(require("../../../services/ListPiecesByShopService"));

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

    const listPieceByShop = _tsyringe.container.resolve(_ListPiecesByShopService.default);

    const piece = await listPieceByShop.execute({
      id_loja: Number(id),
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