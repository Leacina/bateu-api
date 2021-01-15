"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IPerfilRepository = _interopRequireDefault(require("../../repositories/IPerfilRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListPerfilByIDService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PerfilRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IPerfilRepository.default === "undefined" ? Object : _IPerfilRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListPerfilByIDService {
  constructor(perfilRepository) {
    this.perfilRepository = perfilRepository;
  }

  async execute(id) {
    const perfil = await this.perfilRepository.findById(id);
    return perfil;
  }

}) || _class) || _class) || _class) || _class);
exports.default = ListPerfilByIDService;