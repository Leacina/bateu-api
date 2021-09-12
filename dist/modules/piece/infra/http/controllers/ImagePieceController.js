"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _fs = _interopRequireDefault(require("fs"));

var _CreateImagePieceService = _interopRequireDefault(require("../../../services/CreateImagePieceService"));

var _ListImagePieceService = _interopRequireDefault(require("../../../services/ListImagePieceService"));

var _uploadImagePiece = _interopRequireDefault(require("../../../../../config/uploadImagePiece"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ImagePieceController {
  async create(request, response) {
    const createPieces = _tsyringe.container.resolve(_CreateImagePieceService.default);

    const {
      id
    } = request.params;
    const files = [];

    if (request.files) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < request.files.length; i++) {
        files.push(request.files[i].filename);
      }
    }

    const piece = await createPieces.execute({
      files,
      piece_id: Number(id)
    });
    return response.json(piece);
  }

  async show(request, response) {
    const {
      id
    } = request.params;

    const listImagePieceService = _tsyringe.container.resolve(_ListImagePieceService.default);

    const model = await listImagePieceService.execute(Number(id));
    return response.json(model);
  }

  async index(request, response) {
    const {
      filename
    } = request.params;
    const file = `${_uploadImagePiece.default.directory}/${filename}`;

    _fs.default.stat(file, err => {
      if (err) {
        return response.status(404).end('Imagem não encontrada');
      }

      return response.sendFile(file);
    });
  }

}

exports.default = ImagePieceController;