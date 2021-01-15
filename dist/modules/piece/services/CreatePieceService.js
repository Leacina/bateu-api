"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IUsersRepository = _interopRequireDefault(require("../../users/repositories/IUsersRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var yup = _interopRequireWildcard(require("yup"));

var _IShopsRepository = _interopRequireDefault(require("../../establishment/repositories/IShopsRepository"));

var _IEstablishmentsRepository = _interopRequireDefault(require("../../establishment/repositories/IEstablishmentsRepository"));

var _IBrandsRepository = _interopRequireDefault(require("../repositories/IBrandsRepository"));

var _IModelsRepository = _interopRequireDefault(require("../repositories/IModelsRepository"));

var _IPiecesRepository = _interopRequireDefault(require("../repositories/IPiecesRepository"));

var _IImagePieceRepository = _interopRequireDefault(require("../repositories/IImagePieceRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateModelService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PiecesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('ModelsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('BrandsRepository')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('ImagePieceRepository')(target, undefined, 3);
}, _dec6 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 4);
}, _dec7 = function (target, key) {
  return (0, _tsyringe.inject)('ShopsRepository')(target, undefined, 5);
}, _dec8 = function (target, key) {
  return (0, _tsyringe.inject)('EstablishmentsRepository')(target, undefined, 6);
}, _dec9 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", [typeof _IPiecesRepository.default === "undefined" ? Object : _IPiecesRepository.default, typeof _IModelsRepository.default === "undefined" ? Object : _IModelsRepository.default, typeof _IBrandsRepository.default === "undefined" ? Object : _IBrandsRepository.default, typeof _IImagePieceRepository.default === "undefined" ? Object : _IImagePieceRepository.default, typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IShopsRepository.default === "undefined" ? Object : _IShopsRepository.default, typeof _IEstablishmentsRepository.default === "undefined" ? Object : _IEstablishmentsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = _dec9(_class = _dec10(_class = class CreateModelService {
  constructor(piecesRepository, modelsRepository, brandsRepository, imagePieceRepository, usersRepository, shopsRepository, establishmentsRepository) {
    this.piecesRepository = piecesRepository;
    this.modelsRepository = modelsRepository;
    this.brandsRepository = brandsRepository;
    this.imagePieceRepository = imagePieceRepository;
    this.usersRepository = usersRepository;
    this.shopsRepository = shopsRepository;
    this.establishmentsRepository = establishmentsRepository;
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
      is_promocional: yup.string().default(() => {
        return 'Não';
      })
    }); // Caso houver algum erro retorna com status 422

    await schema.validate(data).catch(err => {
      throw new _AppError.default(err.message, 422);
    });
    const user = await this.usersRepository.findById(data.user_id);
    const brand = await this.brandsRepository.findByID(data.id_marca, user.id_conta);

    if (!brand) {
      throw new _AppError.default('Marca não encontrada');
    }

    const model = await this.modelsRepository.findByID(data.id_modelo, user.id_conta);

    if (!model) {
      throw new _AppError.default('Modelo não encontrado');
    } // Verifica se o estabelecimento esta correto


    if (data.id_estabelecimento) {
      const establishment = await this.establishmentsRepository.findById(data.id_estabelecimento); // Verifica se o estabelecimento existe

      if (!establishment) {
        throw new _AppError.default('Estabelecimento informado inválido');
      }
    } // Verifica se a loja esta correto


    if (data.id_loja) {
      const shop = await this.shopsRepository.findById(data.id_loja);

      if (!shop) {
        throw new _AppError.default('Loja informada inválida');
      } // Verifica se tem permissão


      if (shop.id_estabelecimento !== user.id_estabelecimento) {
        throw new _AppError.default('Você não tem permissão para criar com esta loja', 403);
      }
    }

    const countPiece = await this.piecesRepository.count({
      id_conta: 0,
      id_estabelecimento: data.id_estabelecimento,
      id_loja: data.id_loja
    }); // Utilizado para organizar o padLeft do códiigo da peça

    function padLeft(nr, n, str) {
      return Array(n - String(nr).length + 1).join(str || '0') + nr;
    } // eslint-disable-next-line no-param-reassign


    data.codigo_peca = `EC${data.id_estabelecimento}LJ${data.id_loja}${padLeft(countPiece, 3, '0')}`;
    const piece = await this.piecesRepository.create({
      id_conta: user.id_conta,
      ...data,
      qt_disponivel: data.qt_estoque,
      is_promocional: 'Não'
    });
    return piece;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = CreateModelService;