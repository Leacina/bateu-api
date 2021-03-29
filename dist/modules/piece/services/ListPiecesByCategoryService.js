"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IUserRepository = _interopRequireDefault(require("../../users/repositories/IUserRepository"));

var _IPiecesRepository = _interopRequireDefault(require("../repositories/IPiecesRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListPiecesByCategoryService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PiecesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IPiecesRepository.default === "undefined" ? Object : _IPiecesRepository.default, typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListPiecesByCategoryService {
  constructor(piecesRepository, usersRepository) {
    this.piecesRepository = piecesRepository;
    this.usersRepository = usersRepository;
  }

  async execute({
    id,
    cidade,
    user_id,
    filter,
    data
  }) {
    const {
      id_estabelecimento,
      id_loja
    } = data.id_estabelecimento || data.id_loja ? {
      id_estabelecimento: data.id_estabelecimento,
      id_loja: data.id_loja
    } : {
      id_estabelecimento: 0,
      id_loja: 0
    };
    const pieces = await this.piecesRepository.findByCategory(id, cidade, {
      id_estabelecimento,
      id_loja
    }, filter); //    return new ListResponse(pieces, filter.page, filter.pageSize, true);

    return pieces;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = ListPiecesByCategoryService;