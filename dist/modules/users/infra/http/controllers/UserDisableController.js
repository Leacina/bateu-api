"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ActivateOrDisableUserService = _interopRequireDefault(require("../../../services/ActivateOrDisableUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserDisableController {
  async update(request, response) {
    const {
      id
    } = request.params;

    const activateOrDisableUserService = _tsyringe.container.resolve(_ActivateOrDisableUserService.default);

    const user = await activateOrDisableUserService.execute(Number(id), false);
    return response.json(user);
  }

}

exports.default = UserDisableController;