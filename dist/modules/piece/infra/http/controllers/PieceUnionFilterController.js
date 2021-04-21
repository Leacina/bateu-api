"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListPiecesService = _interopRequireDefault(require("../../../services/ListPiecesService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PiecesController {
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

    const pieces = await listPiece.execute(Number(request.user.id), true, {
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

}

exports.default = PiecesController;