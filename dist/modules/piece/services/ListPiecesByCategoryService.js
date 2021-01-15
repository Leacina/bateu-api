"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IUsersRepository = _interopRequireDefault(require("../../users/repositories/IUsersRepository"));

var _AppListResponse = _interopRequireDefault(require("../../../shared/utils/implementations/AppListResponse"));

var _IPiecesRepository = _interopRequireDefault(require("../repositories/IPiecesRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListPiecesByCategoryService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PiecesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IPiecesRepository.default === "undefined" ? Object : _IPiecesRepository.default, typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListPiecesByCategoryService {
  constructor(piecesRepository, usersRepository) {
    this.piecesRepository = piecesRepository;
    this.usersRepository = usersRepository;
  }

  async execute({
    id,
    user_id,
    filter
  }) {
    const {
      id_conta
    } = await this.usersRepository.findById(user_id);
    const pieces = await this.piecesRepository.findByCategory(id, id_conta, filter);
    return new _AppListResponse.default(pieces, filter.page, filter.pageSize);
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = ListPiecesByCategoryService;