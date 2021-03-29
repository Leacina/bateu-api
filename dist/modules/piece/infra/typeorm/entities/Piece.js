"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Account = _interopRequireDefault(require("../../../../users/infra/typeorm/entities/Account"));

var _Establishment = _interopRequireDefault(require("../../../../establishment/infra/typeorm/entities/Establishment"));

var _Shop = _interopRequireDefault(require("../../../../establishment/infra/typeorm/entities/Shop"));

var _Brand = _interopRequireDefault(require("./Brand"));

var _Model = _interopRequireDefault(require("./Model"));

var _Category = _interopRequireDefault(require("./Category"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _dec64, _dec65, _dec66, _dec67, _dec68, _dec69, _dec70, _dec71, _dec72, _dec73, _dec74, _dec75, _dec76, _dec77, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _descriptor32, _descriptor33, _descriptor34, _descriptor35, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let Piece = (_dec = (0, _typeorm.Entity)('tb_cadastro_peca'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)('increment'), _dec3 = Reflect.metadata("design:type", Number), _dec4 = (0, _typeorm.Column)(), _dec5 = Reflect.metadata("design:type", Number), _dec6 = (0, _typeorm.ManyToOne)(() => _Account.default), _dec7 = (0, _typeorm.JoinColumn)({
  name: 'id_conta'
}), _dec8 = Reflect.metadata("design:type", Object), _dec9 = (0, _typeorm.Column)(), _dec10 = Reflect.metadata("design:type", Number), _dec11 = (0, _typeorm.ManyToOne)(() => _Establishment.default), _dec12 = (0, _typeorm.JoinColumn)({
  name: 'id_estabelecimento'
}), _dec13 = Reflect.metadata("design:type", Object), _dec14 = (0, _typeorm.Column)(), _dec15 = Reflect.metadata("design:type", Number), _dec16 = (0, _typeorm.ManyToOne)(() => _Shop.default), _dec17 = (0, _typeorm.JoinColumn)({
  name: 'id_loja'
}), _dec18 = Reflect.metadata("design:type", Object), _dec19 = (0, _typeorm.Column)(), _dec20 = Reflect.metadata("design:type", Number), _dec21 = (0, _typeorm.ManyToOne)(() => _Brand.default), _dec22 = (0, _typeorm.JoinColumn)({
  name: 'id_marca'
}), _dec23 = Reflect.metadata("design:type", Object), _dec24 = (0, _typeorm.Column)(), _dec25 = Reflect.metadata("design:type", Number), _dec26 = (0, _typeorm.ManyToOne)(() => _Model.default), _dec27 = (0, _typeorm.JoinColumn)({
  name: 'id_modelo'
}), _dec28 = Reflect.metadata("design:type", Object), _dec29 = (0, _typeorm.Column)(), _dec30 = Reflect.metadata("design:type", Number), _dec31 = (0, _typeorm.ManyToOne)(() => _Category.default), _dec32 = (0, _typeorm.JoinColumn)({
  name: 'id_categoria'
}), _dec33 = Reflect.metadata("design:type", Object), _dec34 = (0, _typeorm.Column)(), _dec35 = Reflect.metadata("design:type", String), _dec36 = (0, _typeorm.Column)(), _dec37 = Reflect.metadata("design:type", String), _dec38 = (0, _typeorm.Column)(), _dec39 = Reflect.metadata("design:type", Number), _dec40 = (0, _typeorm.Column)(), _dec41 = Reflect.metadata("design:type", Number), _dec42 = (0, _typeorm.Column)(), _dec43 = Reflect.metadata("design:type", Number), _dec44 = (0, _typeorm.Column)(), _dec45 = Reflect.metadata("design:type", Number), _dec46 = (0, _typeorm.Column)(), _dec47 = Reflect.metadata("design:type", Number), _dec48 = (0, _typeorm.Column)(), _dec49 = Reflect.metadata("design:type", Number), _dec50 = (0, _typeorm.Column)(), _dec51 = Reflect.metadata("design:type", String), _dec52 = (0, _typeorm.Column)(), _dec53 = Reflect.metadata("design:type", String), _dec54 = (0, _typeorm.Column)(), _dec55 = Reflect.metadata("design:type", Number), _dec56 = (0, _typeorm.Column)(), _dec57 = Reflect.metadata("design:type", Number), _dec58 = (0, _typeorm.Column)(), _dec59 = Reflect.metadata("design:type", Number), _dec60 = (0, _typeorm.Column)(), _dec61 = Reflect.metadata("design:type", Number), _dec62 = (0, _typeorm.Column)(), _dec63 = Reflect.metadata("design:type", String), _dec64 = (0, _typeorm.Column)(), _dec65 = Reflect.metadata("design:type", String), _dec66 = (0, _typeorm.Column)(), _dec67 = Reflect.metadata("design:type", String), _dec68 = (0, _typeorm.Column)(), _dec69 = Reflect.metadata("design:type", String), _dec70 = (0, _typeorm.Column)(), _dec71 = Reflect.metadata("design:type", String), _dec72 = (0, _typeorm.Column)(), _dec73 = Reflect.metadata("design:type", String), _dec74 = (0, _typeorm.Column)(), _dec75 = Reflect.metadata("design:type", Number), _dec76 = (0, _typeorm.Column)('timestamp'), _dec77 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec(_class = (_class2 = (_temp = class Piece {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "id_conta", _descriptor2, this);

    _initializerDefineProperty(this, "conta", _descriptor3, this);

    _initializerDefineProperty(this, "id_estabelecimento", _descriptor4, this);

    _initializerDefineProperty(this, "estabelecimento", _descriptor5, this);

    _initializerDefineProperty(this, "id_loja", _descriptor6, this);

    _initializerDefineProperty(this, "loja", _descriptor7, this);

    _initializerDefineProperty(this, "id_marca", _descriptor8, this);

    _initializerDefineProperty(this, "marca", _descriptor9, this);

    _initializerDefineProperty(this, "id_modelo", _descriptor10, this);

    _initializerDefineProperty(this, "modelo", _descriptor11, this);

    _initializerDefineProperty(this, "id_categoria", _descriptor12, this);

    _initializerDefineProperty(this, "categoria", _descriptor13, this);

    _initializerDefineProperty(this, "nm_peca", _descriptor14, this);

    _initializerDefineProperty(this, "descricao_peca", _descriptor15, this);

    _initializerDefineProperty(this, "valor_peca", _descriptor16, this);

    _initializerDefineProperty(this, "valor_peca_oficina", _descriptor17, this);

    _initializerDefineProperty(this, "valor_peca_seguradora", _descriptor18, this);

    _initializerDefineProperty(this, "qt_disponivel", _descriptor19, this);

    _initializerDefineProperty(this, "qt_estoque", _descriptor20, this);

    _initializerDefineProperty(this, "ano_inicial", _descriptor21, this);

    _initializerDefineProperty(this, "ano_final", _descriptor22, this);

    _initializerDefineProperty(this, "codigo_peca", _descriptor23, this);

    _initializerDefineProperty(this, "altura", _descriptor24, this);

    _initializerDefineProperty(this, "largura", _descriptor25, this);

    _initializerDefineProperty(this, "comprimento", _descriptor26, this);

    _initializerDefineProperty(this, "peso_bruto", _descriptor27, this);

    _initializerDefineProperty(this, "cor", _descriptor28, this);

    _initializerDefineProperty(this, "condicao_peca", _descriptor29, this);

    _initializerDefineProperty(this, "ds_imagem", _descriptor30, this);

    _initializerDefineProperty(this, "ds_imagem_dois", _descriptor31, this);

    _initializerDefineProperty(this, "ds_imagem_tres", _descriptor32, this);

    _initializerDefineProperty(this, "is_promocional", _descriptor33, this);

    _initializerDefineProperty(this, "peca_destaque", _descriptor34, this);

    _initializerDefineProperty(this, "dh_inc", _descriptor35, this);
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
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "id_marca", [_dec19, _dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "marca", [_dec21, _dec22, _dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "id_modelo", [_dec24, _dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "modelo", [_dec26, _dec27, _dec28], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "id_categoria", [_dec29, _dec30], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "categoria", [_dec31, _dec32, _dec33], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "nm_peca", [_dec34, _dec35], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "descricao_peca", [_dec36, _dec37], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "valor_peca", [_dec38, _dec39], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "valor_peca_oficina", [_dec40, _dec41], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "valor_peca_seguradora", [_dec42, _dec43], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "qt_disponivel", [_dec44, _dec45], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "qt_estoque", [_dec46, _dec47], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "ano_inicial", [_dec48, _dec49], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "ano_final", [_dec50, _dec51], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "codigo_peca", [_dec52, _dec53], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "altura", [_dec54, _dec55], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, "largura", [_dec56, _dec57], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor26 = _applyDecoratedDescriptor(_class2.prototype, "comprimento", [_dec58, _dec59], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor27 = _applyDecoratedDescriptor(_class2.prototype, "peso_bruto", [_dec60, _dec61], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor28 = _applyDecoratedDescriptor(_class2.prototype, "cor", [_dec62, _dec63], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor29 = _applyDecoratedDescriptor(_class2.prototype, "condicao_peca", [_dec64, _dec65], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor30 = _applyDecoratedDescriptor(_class2.prototype, "ds_imagem", [_dec66, _dec67], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor31 = _applyDecoratedDescriptor(_class2.prototype, "ds_imagem_dois", [_dec68, _dec69], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor32 = _applyDecoratedDescriptor(_class2.prototype, "ds_imagem_tres", [_dec70, _dec71], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor33 = _applyDecoratedDescriptor(_class2.prototype, "is_promocional", [_dec72, _dec73], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor34 = _applyDecoratedDescriptor(_class2.prototype, "peca_destaque", [_dec74, _dec75], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor35 = _applyDecoratedDescriptor(_class2.prototype, "dh_inc", [_dec76, _dec77], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
var _default = Piece;
exports.default = _default;