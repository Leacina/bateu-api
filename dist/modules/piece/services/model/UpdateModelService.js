"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IUsersRepository = _interopRequireDefault(require("../../../users/repositories/IUsersRepository"));

var _IModelsRepository = _interopRequireDefault(require("../../repositories/IModelsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListModelService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ModelsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IModelsRepository.default === "undefined" ? Object : _IModelsRepository.default, typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListModelService {
  constructor(modelsRepository, usersRepository) {
    this.modelsRepository = modelsRepository;
    this.usersRepository = usersRepository;
  }

  async execute({
    model_name,
    brand_id,
    model_id,
    user_id
  }) {
    const user = await this.usersRepository.findById(user_id);
    const model = await this.modelsRepository.findByID(model_id, user.id_conta);

    if (model) {
      model.modelo = model_name;
      model.id_marca = brand_id;
      await this.modelsRepository.save(model);
    }

    return model;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = ListModelService;