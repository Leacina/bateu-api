"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _TypePiece = _interopRequireDefault(require("../entities/TypePiece"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TypesPiece {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_TypePiece.default);
  }

  async find() {
    const types = await this.ormRepository.find({
      order: {
        nome: 'DESC'
      }
    });
    return types;
  }

}

var _default = TypesPiece;
exports.default = _default;