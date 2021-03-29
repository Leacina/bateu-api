"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _uploadImageShop = _interopRequireDefault(require("../../../config/uploadImageShop"));

var _tsyringe = require("tsyringe");

var _IShopsRepository = _interopRequireDefault(require("../repositories/IShopsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateImageShopService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ShopsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IShopsRepository.default === "undefined" ? Object : _IShopsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateImageShopService {
  constructor(shopsRepository) {
    this.shopsRepository = shopsRepository;
  }

  async execute({
    shop_id,
    file
  }) {
    const shop = await this.shopsRepository.findById(Number(shop_id));

    if (shop.imagem_loja) {
      const pieceFilePath = _path.default.join(_uploadImageShop.default.directory, shop.imagem_loja);

      try {
        const pieceAvatarFileExists = await _fs.default.promises.stat(pieceFilePath);

        if (pieceAvatarFileExists) {
          await _fs.default.promises.unlink(pieceFilePath);
        }
      } catch (error) {
        shop.imagem_loja = '';
      }
    }

    shop.imagem_loja = file;
    await this.shopsRepository.save(shop);
    return shop;
  }

}) || _class) || _class) || _class) || _class);
var _default = CreateImageShopService;
exports.default = _default;