"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateUserLegalInfoService = _interopRequireDefault(require("../../../services/CreateUserLegalInfoService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserLegalInfoController {
  async create(request, response) {
    const createUser = _tsyringe.container.resolve(_CreateUserLegalInfoService.default);

    const user = await createUser.execute({ ...request.body
    });
    return response.json(user);
  }

}

exports.default = UserLegalInfoController;