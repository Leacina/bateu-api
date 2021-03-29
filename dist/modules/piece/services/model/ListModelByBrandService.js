"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppListResponse = _interopRequireDefault(require("../../../../shared/utils/implementations/AppListResponse"));

var _IModelsRepository = _interopRequireDefault(require("../../repositories/IModelsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListModelService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ModelsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IModelsRepository.default === "undefined" ? Object : _IModelsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListModelService {
  constructor(modelsRepository) {
    this.modelsRepository = modelsRepository;
  }

  async execute(id_marca) {
    const models = await this.modelsRepository.findByBrand(id_marca);
    return new _AppListResponse.default(models, 0, 0);
  }

}) || _class) || _class) || _class) || _class);
exports.default = ListModelService;