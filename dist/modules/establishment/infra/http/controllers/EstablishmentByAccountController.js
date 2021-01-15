"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListEstablishmentsByAccountIDService = _interopRequireDefault(require("../../../services/ListEstablishmentsByAccountIDService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EstablishmentByAccountController {
  async show(request, response) {
    const {
      id
    } = request.params;

    const listEstablishmentsByAccount = _tsyringe.container.resolve(_ListEstablishmentsByAccountIDService.default);

    const establishment = await listEstablishmentsByAccount.execute(Number(id));
    return response.json(establishment);
  }

}

exports.default = EstablishmentByAccountController;