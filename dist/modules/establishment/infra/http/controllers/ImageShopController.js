"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _fs = _interopRequireDefault(require("fs"));

var _CreateImageShop = _interopRequireDefault(require("../../../services/CreateImageShop"));

var _uploadImageShop = _interopRequireDefault(require("../../../../../config/uploadImageShop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ImageShopController {
  async create(request, response) {
    const createImageShop = _tsyringe.container.resolve(_CreateImageShop.default);

    const {
      id
    } = request.params;
    const piece = await createImageShop.execute({
      file: request.file.filename,
      shop_id: Number(id)
    });
    return response.json(piece);
  }

  async index(request, response) {
    const {
      filename
    } = request.params;
    const file = `${_uploadImageShop.default.directory}/${filename}`;

    _fs.default.stat(file, err => {
      if (err) {
        return response.status(404).end('Imagem não encontrada');
      }

      return response.sendFile(file);
    });
  }

}

exports.default = ImageShopController;