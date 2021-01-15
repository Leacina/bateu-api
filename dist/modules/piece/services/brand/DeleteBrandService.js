"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IUsersRepository = _interopRequireDefault(require("../../../users/repositories/IUsersRepository"));

var _IBrandsRepository = _interopRequireDefault(require("../../repositories/IBrandsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DeleteBrandService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('BrandsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IBrandsRepository.default === "undefined" ? Object : _IBrandsRepository.default, typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class DeleteBrandService {
  constructor(brandsRepository, usersRepository) {
    this.brandsRepository = brandsRepository;
    this.usersRepository = usersRepository;
  }

  async execute({
    user_id,
    id
  }) {
    const user = await this.usersRepository.findById(user_id);
    const brand = await this.brandsRepository.findByID(id, user.id_conta);

    if (brand) {
      await this.brandsRepository.delete(id);
    }
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = DeleteBrandService;