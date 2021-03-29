"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IUserRepository = _interopRequireDefault(require("../../users/repositories/IUserRepository"));

var _AppListResponse = _interopRequireDefault(require("../../../shared/utils/implementations/AppListResponse"));

var _IShopsRepository = _interopRequireDefault(require("../../establishment/repositories/IShopsRepository"));

var _IPiecesRepository = _interopRequireDefault(require("../repositories/IPiecesRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListPiecesByShopService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PiecesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('ShopsRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IPiecesRepository.default === "undefined" ? Object : _IPiecesRepository.default, typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default, typeof _IShopsRepository.default === "undefined" ? Object : _IShopsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ListPiecesByShopService {
  constructor(piecesRepository, usersRepository, shopsRepository) {
    this.piecesRepository = piecesRepository;
    this.usersRepository = usersRepository;
    this.shopsRepository = shopsRepository;
  }

  async execute({
    filter,
    id_loja,
    user_id
  }) {
    const {
      id_conta
    } = await this.usersRepository.findById(user_id);
    const {
      id_estabelecimento
    } = await this.shopsRepository.findById(id_loja);
    const pieces = await this.piecesRepository.findByShop({
      id_conta,
      id_loja,
      id_estabelecimento
    });
    return new _AppListResponse.default(pieces, filter.page, filter.pageSize);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = ListPiecesByShopService;