"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IUserRepository = _interopRequireDefault(require("../../users/repositories/IUserRepository"));

var _AppListResponse = _interopRequireDefault(require("../../../shared/utils/implementations/AppListResponse"));

var _IImagePieceRepository = _interopRequireDefault(require("../repositories/IImagePieceRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListImagePiecesService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ImagePieceRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IImagePieceRepository.default === "undefined" ? Object : _IImagePieceRepository.default, typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListImagePiecesService {
  constructor(imagePieceRepository, usersRepository) {
    this.imagePieceRepository = imagePieceRepository;
    this.usersRepository = usersRepository;
  }

  async execute(piece_id) {
    const pieces = await this.imagePieceRepository.findByPieceID(piece_id);
    return new _AppListResponse.default(pieces, 0, 0);
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = ListImagePiecesService;