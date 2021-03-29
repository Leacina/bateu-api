"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IUserRepository = _interopRequireDefault(require("../../../users/repositories/IUserRepository"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _ICategoriesRepository = _interopRequireDefault(require("../../repositories/ICategoriesRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateCategoryService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CategoriesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ICategoriesRepository.default === "undefined" ? Object : _ICategoriesRepository.default, typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateCategoryService {
  constructor(categoriesRepository, usersRepository) {
    this.categoriesRepository = categoriesRepository;
    this.usersRepository = usersRepository;
  }

  async execute({
    category,
    user_id
  }) {
    if (!category) {
      throw new _AppError.default('Nome da categoria não informada');
    }

    const user = await this.usersRepository.findById(user_id);
    const categoryModel = await this.categoriesRepository.create({
      categoria: category,
      id_conta: user.id_conta
    });
    return categoryModel;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = CreateCategoryService;