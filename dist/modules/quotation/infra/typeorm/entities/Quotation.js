"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Account = _interopRequireDefault(require("../../../../users/infra/typeorm/entities/Account"));

var _Establishment = _interopRequireDefault(require("../../../../establishment/infra/typeorm/entities/Establishment"));

var _Shop = _interopRequireDefault(require("../../../../establishment/infra/typeorm/entities/Shop"));

var _QuotationItem = _interopRequireDefault(require("./QuotationItem"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let Quotation = (_dec = (0, _typeorm.Entity)('tb_cotacao'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)('increment'), _dec3 = Reflect.metadata("design:type", Number), _dec4 = (0, _typeorm.Column)(), _dec5 = Reflect.metadata("design:type", Number), _dec6 = (0, _typeorm.ManyToOne)(() => _Account.default), _dec7 = (0, _typeorm.JoinColumn)({
  name: 'id_conta'
}), _dec8 = Reflect.metadata("design:type", typeof _Account.default === "undefined" ? Object : _Account.default), _dec9 = (0, _typeorm.Column)(), _dec10 = Reflect.metadata("design:type", Number), _dec11 = (0, _typeorm.ManyToOne)(() => _Establishment.default), _dec12 = (0, _typeorm.JoinColumn)({
  name: 'id_estabelecimento'
}), _dec13 = Reflect.metadata("design:type", typeof _Establishment.default === "undefined" ? Object : _Establishment.default), _dec14 = (0, _typeorm.Column)(), _dec15 = Reflect.metadata("design:type", Number), _dec16 = (0, _typeorm.ManyToOne)(() => _Shop.default), _dec17 = (0, _typeorm.JoinColumn)({
  name: 'id_loja'
}), _dec18 = Reflect.metadata("design:type", typeof _Shop.default === "undefined" ? Object : _Shop.default), _dec19 = (0, _typeorm.OneToMany)(() => _QuotationItem.default, quotationItem => quotationItem.cotacao), _dec20 = Reflect.metadata("design:type", Array), _dec21 = (0, _typeorm.Column)(), _dec22 = Reflect.metadata("design:type", String), _dec23 = (0, _typeorm.Column)(), _dec24 = Reflect.metadata("design:type", String), _dec25 = (0, _typeorm.Column)(), _dec26 = Reflect.metadata("design:type", String), _dec27 = (0, _typeorm.Column)(), _dec28 = Reflect.metadata("design:type", String), _dec29 = (0, _typeorm.Column)(), _dec30 = Reflect.metadata("design:type", String), _dec31 = (0, _typeorm.Column)(), _dec32 = Reflect.metadata("design:type", Number), _dec33 = (0, _typeorm.Column)('timestamp'), _dec34 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec(_class = (_class2 = (_temp = class Quotation {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "id_conta", _descriptor2, this);

    _initializerDefineProperty(this, "conta", _descriptor3, this);

    _initializerDefineProperty(this, "id_estabelecimento", _descriptor4, this);

    _initializerDefineProperty(this, "estabelecimento", _descriptor5, this);

    _initializerDefineProperty(this, "id_loja", _descriptor6, this);

    _initializerDefineProperty(this, "loja", _descriptor7, this);

    _initializerDefineProperty(this, "items", _descriptor8, this);

    _initializerDefineProperty(this, "emitente", _descriptor9, this);

    _initializerDefineProperty(this, "emitente_email", _descriptor10, this);

    _initializerDefineProperty(this, "emitente_telefone", _descriptor11, this);

    _initializerDefineProperty(this, "situacao", _descriptor12, this);

    _initializerDefineProperty(this, "identificador_cotacao", _descriptor13, this);

    _initializerDefineProperty(this, "is_visualizado_cliente", _descriptor14, this);

    _initializerDefineProperty(this, "dh_inc", _descriptor15, this);

    this.valor_total = void 0;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "id_conta", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "conta", [_dec6, _dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "id_estabelecimento", [_dec9, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "estabelecimento", [_dec11, _dec12, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "id_loja", [_dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "loja", [_dec16, _dec17, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "items", [_dec19, _dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "emitente", [_dec21, _dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "emitente_email", [_dec23, _dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "emitente_telefone", [_dec25, _dec26], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "situacao", [_dec27, _dec28], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "identificador_cotacao", [_dec29, _dec30], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "is_visualizado_cliente", [_dec31, _dec32], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "dh_inc", [_dec33, _dec34], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
var _default = Quotation;
exports.default = _default;