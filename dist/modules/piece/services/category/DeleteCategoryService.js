"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IUserRepository = _interopRequireDefault(require("../../../users/repositories/IUserRepository"));

var _ICategoriesRepository = _interopRequireDefault(require("../../repositories/ICategoriesRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DeleteCategoryService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CategoriesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ICategoriesRepository.default === "undefined" ? Object : _ICategoriesRepository.default, typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class DeleteCategoryService {
  constructor(categoriesRepository, usersRepository) {
    this.categoriesRepository = categoriesRepository;
    this.usersRepository = usersRepository;
  }

  async execute({
    id,
    user_id
  }) {
    const user = await this.usersRepository.findById(user_id);
    const category = await this.categoriesRepository.findByID(id, user.id_conta);

    if (category) {
      await this.categoriesRepository.delete(id);
    }
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = DeleteCategoryService;