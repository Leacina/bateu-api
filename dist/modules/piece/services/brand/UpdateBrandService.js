"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IUserRepository = _interopRequireDefault(require("../../../users/repositories/IUserRepository"));

var _IBrandsRepository = _interopRequireDefault(require("../../repositories/IBrandsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListBrandService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('BrandsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IBrandsRepository.default === "undefined" ? Object : _IBrandsRepository.default, typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListBrandService {
  constructor(brandsRepository, usersRepository) {
    this.brandsRepository = brandsRepository;
    this.usersRepository = usersRepository;
  }

  async execute({
    brand_id,
    user_id,
    marca,
    pais
  }) {
    const user = await this.usersRepository.findById(user_id);
    const brand = await this.brandsRepository.findByID(brand_id, user.id_conta);

    if (brand) {
      brand.marca = marca;
      brand.pais = pais;
      await this.brandsRepository.save(brand);
    }

    return brand;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = ListBrandService;