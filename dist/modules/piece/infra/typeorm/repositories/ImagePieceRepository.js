"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _ImagePiece = _interopRequireDefault(require("../entities/ImagePiece"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ImagePieceRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_ImagePiece.default);
  }

  async findByPieceID(id) {
    const image = await this.ormRepository.find({
      // where,
      where: {
        id_produto: id
      },
      relations: ['produto']
    });
    return image;
  }

  async deleteByPieceId(id) {
    await this.ormRepository.delete({
      id_produto: id
    });
  }

  async save(data) {
    const model = await this.ormRepository.save(data);
    return model;
  }

  async findByImagemName(image) {
    const imageModel = await this.ormRepository.findOne({
      where: {
        imagem: image
      }
    });
    return imageModel;
  }

  async create(data) {
    const image = this.ormRepository.create({ ...data,
      dh_inc: new Date()
    });
    await this.ormRepository.save(image);
    return image;
  }

}

var _default = ImagePieceRepository;
exports.default = _default;