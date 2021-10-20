"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Establishment = _interopRequireDefault(require("../../../../establishment/infra/typeorm/entities/Establishment"));

var _Shop = _interopRequireDefault(require("../../../../establishment/infra/typeorm/entities/Shop"));

var _Account = _interopRequireDefault(require("./Account"));

var _Perfil = _interopRequireDefault(require("./Perfil"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let User = (_dec = (0, _typeorm.Entity)('tb_sistema_usuario'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)('increment'), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeorm.Column)(), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.Column)(), _dec7 = Reflect.metadata("design:type", String), _dec8 = (0, _typeorm.Column)(), _dec9 = Reflect.metadata("design:type", String), _dec10 = (0, _typeorm.Column)(), _dec11 = Reflect.metadata("design:type", Number), _dec12 = (0, _typeorm.ManyToOne)(() => _Account.default), _dec13 = (0, _typeorm.JoinColumn)({
  name: 'id_conta'
}), _dec14 = Reflect.metadata("design:type", typeof _Account.default === "undefined" ? Object : _Account.default), _dec15 = (0, _typeorm.Column)(), _dec16 = Reflect.metadata("design:type", Number), _dec17 = (0, _typeorm.Column)(), _dec18 = Reflect.metadata("design:type", String), _dec19 = (0, _typeorm.Column)(), _dec20 = Reflect.metadata("design:type", String), _dec21 = (0, _typeorm.Column)(), _dec22 = Reflect.metadata("design:type", Number), _dec23 = (0, _typeorm.ManyToOne)(() => _Shop.default), _dec24 = (0, _typeorm.JoinColumn)({
  name: 'id_loja'
}), _dec25 = Reflect.metadata("design:type", typeof _Shop.default === "undefined" ? Object : _Shop.default), _dec26 = (0, _typeorm.ManyToOne)(() => _Perfil.default), _dec27 = (0, _typeorm.JoinColumn)({
  name: 'id_perfil'
}), _dec28 = Reflect.metadata("design:type", typeof _Perfil.default === "undefined" ? Object : _Perfil.default), _dec29 = (0, _typeorm.Column)(), _dec30 = Reflect.metadata("design:type", Number), _dec31 = (0, _typeorm.ManyToOne)(() => _Establishment.default), _dec32 = (0, _typeorm.JoinColumn)({
  name: 'id_estabelecimento'
}), _dec33 = Reflect.metadata("design:type", typeof _Establishment.default === "undefined" ? Object : _Establishment.default), _dec34 = (0, _typeorm.Column)(), _dec35 = Reflect.metadata("design:type", String), _dec36 = (0, _typeorm.Column)(), _dec37 = Reflect.metadata("design:type", String), _dec(_class = (_class2 = (_temp = class User {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "ds_login", _descriptor2, this);

    _initializerDefineProperty(this, "nm_usuario", _descriptor3, this);

    _initializerDefineProperty(this, "ds_senha", _descriptor4, this);

    _initializerDefineProperty(this, "id_conta", _descriptor5, this);

    _initializerDefineProperty(this, "conta", _descriptor6, this);

    _initializerDefineProperty(this, "id_perfil", _descriptor7, this);

    _initializerDefineProperty(this, "is_ativo", _descriptor8, this);

    _initializerDefineProperty(this, "tp_usuario", _descriptor9, this);

    _initializerDefineProperty(this, "id_loja", _descriptor10, this);

    _initializerDefineProperty(this, "loja", _descriptor11, this);

    _initializerDefineProperty(this, "perfil", _descriptor12, this);

    _initializerDefineProperty(this, "id_estabelecimento", _descriptor13, this);

    _initializerDefineProperty(this, "estabelecimento", _descriptor14, this);

    _initializerDefineProperty(this, "telefone", _descriptor15, this);

    _initializerDefineProperty(this, "sw_notification", _descriptor16, this);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ds_login", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nm_usuario", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "ds_senha", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "id_conta", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "conta", [_dec12, _dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "id_perfil", [_dec15, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "is_ativo", [_dec17, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "tp_usuario", [_dec19, _dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "id_loja", [_dec21, _dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "loja", [_dec23, _dec24, _dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "perfil", [_dec26, _dec27, _dec28], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "id_estabelecimento", [_dec29, _dec30], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "estabelecimento", [_dec31, _dec32, _dec33], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "telefone", [_dec34, _dec35], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "sw_notification", [_dec36, _dec37], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
var _default = User;
exports.default = _default;