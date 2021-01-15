"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IUsersRepository = _interopRequireDefault(require("../../users/repositories/IUsersRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var yup = _interopRequireWildcard(require("yup"));

var _IPiecesRepository = _interopRequireDefault(require("../repositories/IPiecesRepository"));

var _IImagePieceRepository = _interopRequireDefault(require("../repositories/IImagePieceRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdatePieceService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PiecesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('ImagePieceRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IPiecesRepository.default === "undefined" ? Object : _IPiecesRepository.default, typeof _IImagePieceRepository.default === "undefined" ? Object : _IImagePieceRepository.default, typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class UpdatePieceService {
  constructor(piecesRepository, imagePieceRepository, usersRepository) {
    this.piecesRepository = piecesRepository;
    this.imagePieceRepository = imagePieceRepository;
    this.usersRepository = usersRepository;
  }

  async execute(data) {
    // Validações necessárias para criar o usuário
    const schema = yup.object().shape({
      id_estabelecimento: yup.number().required('Estabelecimento não informado'),
      id_loja: yup.number().required('Loja não informada'),
      id_marca: yup.number().required('Marca não informada'),
      id_modelo: yup.number().required('Modelo não informado'),
      id_categoria: yup.number().required('Categoriia não informada'),
      nm_peca: yup.string().required('Nome da peça não informada'),
      valor_peca: yup.number().required('Valor da peça não informado'),
      valor_peca_oficina: yup.number().required('Valor da peça na oficina não informado'),
      valor_peca_seguradora: yup.number().required('Valor da peça na seguradora não informado'),
      qt_estoque: yup.number().required('Quantidade em estoquee não informado'),
      ano_inicial: yup.string().required('Ano inicial não informado'),
      codigo_peca: yup.string().required('Código da peça não informado'),
      is_promocional: yup.string().default(() => {
        return 'Não';
      })
    }); // Caso houver algum erro retorna com status 422

    await schema.validate(data).catch(err => {
      throw new _AppError.default(err.message, 422);
    });
    const user = await this.usersRepository.findById(data.user_id);
    const piece = await this.piecesRepository.findByID(data.id, user.id_conta); // TODO: Rever essa atribuição

    if (piece) {
      piece.id_categoria = data.id_categoria || piece.id_categoria;
      piece.ano_final = data.ano_final || piece.ano_final;
      piece.ano_inicial = data.ano_inicial || piece.ano_inicial;
      piece.codigo_peca = data.codigo_peca || piece.codigo_peca;
      piece.comprimento = data.comprimento || piece.comprimento;
      piece.condicao_peca = data.condicao_peca || piece.condicao_peca;
      piece.cor = data.cor || piece.cor;
      piece.descricao_peca = data.descricao_peca || piece.descricao_peca;
      piece.id_marca = data.id_marca || piece.id_marca;
      piece.id_modelo = data.id_modelo || piece.id_modelo;
      piece.is_promocional = data.is_promocional || piece.is_promocional;
      piece.largura = data.largura || piece.largura;
      piece.nm_peca = data.nm_peca || piece.nm_peca;
      piece.peso_bruto = data.peso_bruto || piece.peso_bruto;
      piece.qt_estoque = data.qt_estoque || piece.qt_estoque;
      piece.valor_peca = data.valor_peca || piece.valor_peca;
      piece.peca_destaque = data.peca_destaque || piece.peca_destaque;
      piece.valor_peca_oficina = data.valor_peca_oficina || piece.valor_peca_oficina;
      piece.valor_peca_seguradora = data.valor_peca_seguradora || piece.valor_peca_seguradora;
      await this.piecesRepository.save(piece);
    }

    return piece;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = UpdatePieceService;