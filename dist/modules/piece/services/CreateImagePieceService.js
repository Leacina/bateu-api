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

var _IPiecesRepository = _interopRequireDefault(require("../repositories/IPiecesRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateUserAvatarService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ImagePieceRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('PiecesRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IImagePieceRepository.default === "undefined" ? Object : _IImagePieceRepository.default, typeof _IPiecesRepository.default === "undefined" ? Object : _IPiecesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateUserAvatarService {
  constructor(imagePieceRepository, piecesRepository) {
    this.imagePieceRepository = imagePieceRepository;
    this.piecesRepository = piecesRepository;
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
    let countFiles = 0;
    const piece = await this.piecesRepository.findByID(piece_id);
    const URL_IMAGE = 'https://bateuweb.com.br/api/peca/imagem/';
    files.map(async file => {
      countFiles += 1;

      if (countFiles === 1) {
        piece.ds_imagem = URL_IMAGE + file;
      }

      if (countFiles === 2) {
        piece.ds_imagem_dois = URL_IMAGE + file;
      }

      if (countFiles === 3) {
        piece.ds_imagem_tres = URL_IMAGE + file;
      }

      const image = await this.imagePieceRepository.create({
        id_produto: Number(piece_id),
        imagem: file
      });
      return newImages.push(image);
    });
    await this.piecesRepository.save(piece);
    return newImages;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = UpdateUserAvatarService;
exports.default = _default;