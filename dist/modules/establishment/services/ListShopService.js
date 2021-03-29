"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppListResponse = _interopRequireDefault(require("../../../shared/utils/implementations/AppListResponse"));

var _IShopsRepository = _interopRequireDefault(require("../repositories/IShopsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListShopService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ShopsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IShopsRepository.default === "undefined" ? Object : _IShopsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListShopService {
  /**
   * Realiza a injeção de dependencia de acordo com a pasta Provider.
   * @param shopsRepository
   */
  constructor(shopsRepository) {
    this.shopsRepository = shopsRepository;
  }

  async execute(filter) {
    const shop = await this.shopsRepository.find(filter);
    return new _AppListResponse.default(shop, filter.page, filter.pageSize);
  }

}) || _class) || _class) || _class) || _class);
var _default = ListShopService;
exports.default = _default;