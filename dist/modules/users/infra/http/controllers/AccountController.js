"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateAccountService = _interopRequireDefault(require("../../../services/account/CreateAccountService"));

var _ListAccountByIDService = _interopRequireDefault(require("../../../services/account/ListAccountByIDService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AccountController {
  async create(request, response) {
    const createAccount = _tsyringe.container.resolve(_CreateAccountService.default);

    const account = await createAccount.execute(request.body);
    return response.json(account);
  }

  async index(request, response) {
    const {
      id
    } = request.params;

    const listAccountByID = _tsyringe.container.resolve(_ListAccountByIDService.default);

    const account = await listAccountByID.execute(Number(id));
    return response.json(account);
  }

}

exports.default = AccountController;