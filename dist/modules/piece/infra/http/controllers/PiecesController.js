"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreatePieceService = _interopRequireDefault(require("../../../services/CreatePieceService"));

var _DeletePieceService = _interopRequireDefault(require("../../../services/DeletePieceService"));

var _ListPieceByIDService = _interopRequireDefault(require("../../../services/ListPieceByIDService"));

var _ListPiecesService = _interopRequireDefault(require("../../../services/ListPiecesService"));

var _UpdatePieceService = _interopRequireDefault(require("../../../services/UpdatePieceService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PiecesController {
  async create(request, response) {
    const createPieces = _tsyringe.container.resolve(_CreatePieceService.default);

    const piece = await createPieces.execute({ ...request.body,
      user_id: Number(request.user.id)
    });
    return response.json(piece);
  }

  async index(request, response) {
    const {
      id
    } = request.params;

    const listPieceById = _tsyringe.container.resolve(_ListPieceByIDService.default);

    const piece = await listPieceById.execute({
      piece_id: Number(id),
      user_id: Number(request.user.id)
    });
    return response.json(piece);
  }

  async show(request, response) {
    const {
      page,
      pageSize,
      search,
      ignorePage,
      ignoreEstablishment,
      pagination,
      // FILTERS
      ano_final,
      ano_inicial,
      categoria,
      descricao,
      marca,
      modelo
    } = request.query;

    const listPiece = _tsyringe.container.resolve(_ListPiecesService.default);

    const pieces = await listPiece.execute(Number(request.user.id), false, {
      ignorePage: ignorePage === 'true' || pagination !== 'true',
      ignoreEstablishment: ignoreEstablishment === 'true' || pagination !== 'true',
      search: search ? String(search) : '',
      page: Number(page),
      pageSize: Number(pageSize)
    }, {
      ano_final: ano_final ? Number(ano_final) : 0,
      ano_inicial: ano_inicial ? Number(ano_inicial) : 0,
      categoria: categoria ? String(categoria) : '',
      descricao: descricao ? String(descricao) : '',
      marca: marca ? String(marca) : '',
      modelo: modelo ? String(modelo) : ''
    });
    return response.json(pieces);
  }

  async delete(request, response) {
    const {
      id
    } = request.params;

    const deletePiece = _tsyringe.container.resolve(_DeletePieceService.default);

    await deletePiece.execute({
      id: Number(id),
      user_id: Number(request.user.id)
    });
    return response.status(200).send();
  }

  async update(request, response) {
    const {
      id
    } = request.params;

    const updatePiece = _tsyringe.container.resolve(_UpdatePieceService.default);

    const brand = await updatePiece.execute({
      id,
      ...request.body,
      user_id: Number(request.user.id)
    });
    return response.json(brand);
  }

}

exports.default = PiecesController;