"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IUsersRepository = _interopRequireDefault(require("../../users/repositories/IUsersRepository"));

var _IPiecesRepository = _interopRequireDefault(require("../repositories/IPiecesRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DeletePieceService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PiecesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IPiecesRepository.default === "undefined" ? Object : _IPiecesRepository.default, typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class DeletePieceService {
  constructor(piecesRepository, usersRepository) {
    this.piecesRepository = piecesRepository;
    this.usersRepository = usersRepository;
  }

  async execute({
    id,
    user_id
  }) {
    const user = await this.usersRepository.findById(user_id);
    const piece = await this.piecesRepository.findByID(id, user.id_conta);

    if (piece) {
      await this.piecesRepository.delete(id);
    }
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = DeletePieceService;