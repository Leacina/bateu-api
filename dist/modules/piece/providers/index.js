"use strict";

var _tsyringe = require("tsyringe");

var _BrandsRepository = _interopRequireDefault(require("../infra/typeorm/repositories/BrandsRepository"));

var _ModelsRepository = _interopRequireDefault(require("../infra/typeorm/repositories/ModelsRepository"));

var _CategoriesRepository = _interopRequireDefault(require("../infra/typeorm/repositories/CategoriesRepository"));

var _PiecesRepository = _interopRequireDefault(require("../infra/typeorm/repositories/PiecesRepository"));

var _ImagePieceRepository = _interopRequireDefault(require("../infra/typeorm/repositories/ImagePieceRepository"));

var _TypesPieceRepository = _interopRequireDefault(require("../infra/typeorm/repositories/TypesPieceRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Injeção de dependências
 */
_tsyringe.container.registerSingleton('ImagePieceRepository', _ImagePieceRepository.default);

_tsyringe.container.registerSingleton('BrandsRepository', _BrandsRepository.default);

_tsyringe.container.registerSingleton('ModelsRepository', _ModelsRepository.default);

_tsyringe.container.registerSingleton('CategoriesRepository', _CategoriesRepository.default);

_tsyringe.container.registerSingleton('PiecesRepository', _PiecesRepository.default);

_tsyringe.container.registerSingleton('TypesPieceRepository', _TypesPieceRepository.default);