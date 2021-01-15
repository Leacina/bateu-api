"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListShopByIDService = _interopRequireDefault(require("../../../services/ListShopByIDService"));

var _ListShopService = _interopRequireDefault(require("../../../services/ListShopService"));

var _CreateShopService = _interopRequireDefault(require("../../../services/CreateShopService"));

var _UpdateShopService = _interopRequireDefault(require("../../../services/UpdateShopService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserController {
  async index(request, response) {
    const {
      id
    } = request.params;

    const listShop = _tsyringe.container.resolve(_ListShopByIDService.default);

    const shop = await listShop.execute(Number(id));
    return response.json(shop);
  }

  async show(request, response) {
    const {
      page,
      pageSize,
      search
    } = request.query;

    const listShopService = _tsyringe.container.resolve(_ListShopService.default);

    const shop = await listShopService.execute({
      search: search ? String(search) : '',
      page: Number(page),
      pageSize: Number(pageSize)
    });
    return response.json(shop);
  }

  async create(request, response) {
    const createShop = _tsyringe.container.resolve(_CreateShopService.default);

    const shop = await createShop.execute(request.body);
    return response.json(shop);
  }

  async update(request, response) {
    const {
      id
    } = request.params;

    const updateShopService = _tsyringe.container.resolve(_UpdateShopService.default);

    const shop = await updateShopService.execute(Number(id), request.body);
    return response.json(shop);
  }

}

exports.default = UserController;