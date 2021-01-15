"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));

var _ListUsersLogistOrClientService = _interopRequireDefault(require("../../../services/ListUsersLogistOrClientService"));

var _ListUserByIdService = _interopRequireDefault(require("../../../services/ListUserByIdService"));

var _UpdateUserService = _interopRequireDefault(require("../../../services/UpdateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserController {
  async create(request, response) {
    const createUser = _tsyringe.container.resolve(_CreateUserService.default);

    const user = await createUser.execute(request.body);
    delete user.ds_senha;
    return response.json(user);
  }

  async update(request, response) {
    const {
      id
    } = request.params;

    const updateUserService = _tsyringe.container.resolve(_UpdateUserService.default);

    const user = await updateUserService.execute(Number(id), request.body);
    delete user.ds_senha;
    return response.json(user);
  }

  async show(request, response) {
    const {
      page,
      pageSize,
      search
    } = request.query;

    const listUsersService = _tsyringe.container.resolve(_ListUsersLogistOrClientService.default);

    const user = await listUsersService.execute(true, {
      search: search ? String(search) : '',
      page: Number(page),
      pageSize: Number(pageSize)
    });
    return response.json(user);
  }

  async index(request, response) {
    const {
      id
    } = request.params;

    const listUserByIdService = _tsyringe.container.resolve(_ListUserByIdService.default);

    const user = await listUserByIdService.execute(Number(id));
    return response.json(user);
  }

}

exports.default = UserController;