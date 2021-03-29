"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IUserRepository = _interopRequireDefault(require("../../users/repositories/IUserRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IPiecesRepository = _interopRequireDefault(require("../repositories/IPiecesRepository"));

var _IImagePieceRepository = _interopRequireDefault(require("../repositories/IImagePieceRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdatePieceSpotlightService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PiecesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('ImagePieceRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IPiecesRepository.default === "undefined" ? Object : _IPiecesRepository.default, typeof _IImagePieceRepository.default === "undefined" ? Object : _IImagePieceRepository.default, typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class UpdatePieceSpotlightService {
  constructor(piecesRepository, imagePieceRepository, usersRepository) {
    this.piecesRepository = piecesRepository;
    this.imagePieceRepository = imagePieceRepository;
    this.usersRepository = usersRepository;
  }

  async execute(id, user_id, piece_spotlight) {
    const user = await this.usersRepository.findById(user_id);
    const piece = await this.piecesRepository.findByID(id, user.id_conta);

    if (piece_spotlight !== 0 && piece_spotlight !== 1) {
      throw new _AppError.default('Valor da peça em destaque informado errado', 401);
    } // TODO: Rever essa atribuição


    if (piece) {
      piece.peca_destaque = piece_spotlight;
      await this.piecesRepository.save(piece);
    }

    return piece;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = UpdatePieceSpotlightService;