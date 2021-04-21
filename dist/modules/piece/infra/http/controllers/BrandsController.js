"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateBrandService = _interopRequireDefault(require("../../../services/brand/CreateBrandService"));

var _DeleteBrandService = _interopRequireDefault(require("../../../services/brand/DeleteBrandService"));

var _ListBrandByIDService = _interopRequireDefault(require("../../../services/brand/ListBrandByIDService"));

var _ListBrandsService = _interopRequireDefault(require("../../../services/brand/ListBrandsService"));

var _UpdateBrandService = _interopRequireDefault(require("../../../services/brand/UpdateBrandService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BrandsController {
  async create(request, response) {
    const {
      id_estabelecimento,
      id_loja,
      marca,
      pais
    } = request.body;

    const createBrands = _tsyringe.container.resolve(_CreateBrandService.default);

    const brand = await createBrands.execute({
      id_estabelecimento,
      id_loja,
      marca,
      user_id: Number(request.user.id),
      pais
    });
    return response.json(brand);
  }

  async index(request, response) {
    const {
      id
    } = request.params;

    const listBrandById = _tsyringe.container.resolve(_ListBrandByIDService.default);

    const brand = await listBrandById.execute({
      id_brand: Number(id),
      user_id: Number(request.user.id)
    });
    return response.json(brand);
  }

  async show(request, response) {
    const {
      page,
      pageSize,
      search,
      ignorePage,
      pagination
    } = request.query;

    const listBrand = _tsyringe.container.resolve(_ListBrandsService.default);

    const brands = await listBrand.execute(Number(request.user.id), {
      ignorePage: ignorePage === 'true' || pagination !== 'true',
      search: search ? String(search) : '',
      page: Number(page),
      pageSize: Number(pageSize)
    });
    return response.json(brands);
  }

  async delete(request, response) {
    const {
      id
    } = request.params;

    const deleteBrand = _tsyringe.container.resolve(_DeleteBrandService.default);

    await deleteBrand.execute({
      id: Number(id),
      user_id: Number(request.user.id)
    });
    return response.status(200).send();
  }

  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      marca,
      pais
    } = request.body;

    const updateBrand = _tsyringe.container.resolve(_UpdateBrandService.default);

    const brand = await updateBrand.execute({
      marca,
      brand_id: Number(id),
      user_id: Number(request.user.id),
      pais
    });
    return response.json(brand);
  }

}

exports.default = BrandsController;