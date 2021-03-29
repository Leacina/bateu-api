"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListShopByEstablishmentIdService = _interopRequireDefault(require("../../../services/ListShopByEstablishmentIdService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShopByAccountController {
  async show(request, response) {
    const {
      id
    } = request.params;

    const listShopByEstablishmentIdService = _tsyringe.container.resolve(_ListShopByEstablishmentIdService.default);

    const shop = await listShopByEstablishmentIdService.execute(Number(id));
    return response.json(shop);
  }

}

exports.default = ShopByAccountController;