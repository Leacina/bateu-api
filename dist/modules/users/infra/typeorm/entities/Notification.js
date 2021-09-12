"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Budget = _interopRequireDefault(require("../../../../budget/infra/typeorm/entities/Budget"));

var _Quotation = _interopRequireDefault(require("../../../../quotation/infra/typeorm/entities/Quotation"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let Notification = (_dec = (0, _typeorm.Entity)('tb_notificacao'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)('increment'), _dec3 = Reflect.metadata("design:type", Number), _dec4 = (0, _typeorm.Column)(), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.Column)(), _dec7 = Reflect.metadata("design:type", Number), _dec8 = (0, _typeorm.Column)(), _dec9 = Reflect.metadata("design:type", Number), _dec10 = (0, _typeorm.ManyToOne)(() => _Budget.default), _dec11 = (0, _typeorm.JoinColumn)({
  name: 'id_orcamento'
}), _dec12 = Reflect.metadata("design:type", typeof _Budget.default === "undefined" ? Object : _Budget.default), _dec13 = (0, _typeorm.Column)(), _dec14 = Reflect.metadata("design:type", Number), _dec15 = (0, _typeorm.ManyToOne)(() => _Quotation.default), _dec16 = (0, _typeorm.JoinColumn)({
  name: 'id_cotacao'
}), _dec17 = Reflect.metadata("design:type", typeof _Quotation.default === "undefined" ? Object : _Quotation.default), _dec18 = (0, _typeorm.Column)(), _dec19 = Reflect.metadata("design:type", Number), _dec20 = (0, _typeorm.Column)(), _dec21 = Reflect.metadata("design:type", Number), _dec(_class = (_class2 = (_temp = class Notification {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "mensagem", _descriptor2, this);

    _initializerDefineProperty(this, "id_usuario", _descriptor3, this);

    _initializerDefineProperty(this, "id_orcamento", _descriptor4, this);

    _initializerDefineProperty(this, "orcamento", _descriptor5, this);

    _initializerDefineProperty(this, "id_cotacao", _descriptor6, this);

    _initializerDefineProperty(this, "cotacao", _descriptor7, this);

    _initializerDefineProperty(this, "id_loja", _descriptor8, this);

    _initializerDefineProperty(this, "is_visualizado", _descriptor9, this);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "mensagem", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "id_usuario", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "id_orcamento", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "orcamento", [_dec10, _dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "id_cotacao", [_dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "cotacao", [_dec15, _dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "id_loja", [_dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "is_visualizado", [_dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
var _default = Notification;
exports.default = _default;