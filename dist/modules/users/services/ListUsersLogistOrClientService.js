"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppListResponse = _interopRequireDefault(require("../../../shared/utils/implementations/AppListResponse"));

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListUsersLogistByIDService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListUsersLogistByIDService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(logist, filter) {
    const user = await this.usersRepository.find(logist, filter);
    return new _AppListResponse.default(user, filter.page, filter.pageSize);
  }

}) || _class) || _class) || _class) || _class);
exports.default = ListUsersLogistByIDService;