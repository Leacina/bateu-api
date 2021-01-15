"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateCategoryService = _interopRequireDefault(require("../../../services/category/CreateCategoryService"));

var _DeleteCategoryService = _interopRequireDefault(require("../../../services/category/DeleteCategoryService"));

var _ListCategoryByIDService = _interopRequireDefault(require("../../../services/category/ListCategoryByIDService"));

var _ListCategoriesService = _interopRequireDefault(require("../../../services/category/ListCategoriesService"));

var _UpdateCategoryService = _interopRequireDefault(require("../../../services/category/UpdateCategoryService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CategoriesController {
  async create(request, response) {
    const {
      categoria
    } = request.body;

    const createCategories = _tsyringe.container.resolve(_CreateCategoryService.default);

    const category = await createCategories.execute({
      category: categoria,
      user_id: Number(request.user.id)
    });
    return response.json(category);
  }

  async index(request, response) {
    const {
      id
    } = request.params;

    const listCategoryById = _tsyringe.container.resolve(_ListCategoryByIDService.default);

    const category = await listCategoryById.execute({
      id_category: Number(id),
      user_id: Number(request.user.id)
    });
    return response.json(category);
  }

  async show(request, response) {
    const {
      page,
      pageSize
    } = request.query;

    const listCategory = _tsyringe.container.resolve(_ListCategoriesService.default);

    const categories = await listCategory.execute(Number(request.user.id), {
      page: Number(page),
      pageSize: Number(pageSize)
    });
    return response.json(categories);
  }

  async delete(request, response) {
    const {
      id
    } = request.params;

    const deleteCategory = _tsyringe.container.resolve(_DeleteCategoryService.default);

    await deleteCategory.execute({
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
      categoria
    } = request.body;

    const updateCategory = _tsyringe.container.resolve(_UpdateCategoryService.default);

    const category = await updateCategory.execute({
      category: categoria,
      category_id: Number(id),
      user_id: Number(request.user.id)
    });
    return response.json(category);
  }

}

exports.default = CategoriesController;