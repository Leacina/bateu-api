"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppListResponse = _interopRequireDefault(require("../../../shared/utils/implementations/AppListResponse"));

var _ITypesPieceRepository = _interopRequireDefault(require("../repositories/ITypesPieceRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListTypesPiecesService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('TypesPieceRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ITypesPieceRepository.default === "undefined" ? Object : _ITypesPieceRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListTypesPiecesService {
  constructor(typesPieceRepository) {
    this.typesPieceRepository = typesPieceRepository;
  }

  async execute(filter) {
    const pieces = await this.typesPieceRepository.find();
    return new _AppListResponse.default(pieces, filter.page, filter.pageSize, filter.ignorePage);
  }

}) || _class) || _class) || _class) || _class);
exports.default = ListTypesPiecesService;