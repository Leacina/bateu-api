"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListUsersLogistOrClientService = _interopRequireDefault(require("../../../services/ListUsersLogistOrClientService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserController {
  async show(request, response) {
    const {
      page,
      pageSize,
      search
    } = request.query;

    const listUsersService = _tsyringe.container.resolve(_ListUsersLogistOrClientService.default);

    const user = await listUsersService.execute(false, {
      search: search ? String(search) : '',
      page: Number(page),
      pageSize: Number(pageSize)
    });
    return response.json(user);
  }

}

exports.default = UserController;