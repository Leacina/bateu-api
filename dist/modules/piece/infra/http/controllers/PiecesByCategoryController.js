"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListPiecesByCategoryService = _interopRequireDefault(require("../../../services/ListPiecesByCategoryService"));

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

    const listPieceByCategory = _tsyringe.container.resolve(_ListPiecesByCategoryService.default);

    const piece = await listPieceByCategory.execute({
      id: Number(id),
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