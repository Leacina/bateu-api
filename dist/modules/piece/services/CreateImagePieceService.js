"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _uploadImagePiece = _interopRequireDefault(require("../../../config/uploadImagePiece"));

var _tsyringe = require("tsyringe");

var _IImagePieceRepository = _interopRequireDefault(require("../repositories/IImagePieceRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateUserAvatarService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ImagePieceRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IImagePieceRepository.default === "undefined" ? Object : _IImagePieceRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateUserAvatarService {
  constructor(imagePieceRepository) {
    this.imagePieceRepository = imagePieceRepository;
  }

  async execute({
    piece_id,
    files
  }) {
    const images = await this.imagePieceRepository.findByPieceID(Number(piece_id));
    images.map(async image => {
      if (image.imagem) {
        const pieceFilePath = _path.default.join(_uploadImagePiece.default.directory, image.imagem);

        const pieceAvatarFileExists = await _fs.default.promises.stat(pieceFilePath);

        if (pieceAvatarFileExists) {
          await _fs.default.promises.unlink(pieceFilePath);
        }
      }
    });
    await this.imagePieceRepository.deleteByPieceId(Number(piece_id));
    const newImages = new Array();
    files.map(async file => {
      const image = await this.imagePieceRepository.create({
        id_produto: Number(piece_id),
        imagem: file
      });
      return newImages.push(image);
    });
    return newImages;
  }

}) || _class) || _class) || _class) || _class);
var _default = UpdateUserAvatarService;
exports.default = _default;