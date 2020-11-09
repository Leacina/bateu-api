import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateBrandService from '@modules/piece/services/brand/CreateBrandService';
import DeleteBrandService from '@modules/piece/services/brand/DeleteBrandService';
import ListBrandByIDService from '@modules/piece/services/brand/ListBrandByIDService';
import ListBrandService from '@modules/piece/services/brand/ListBrandsService';
import UpdateBrandService from '@modules/piece/services/brand/UpdateBrandService';

export default class BrandsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id_estabelecimento, id_loja, marca } = request.body;
    const createBrands = container.resolve(CreateBrandService);

    const brand = await createBrands.execute({
      id_estabelecimento,
      id_loja,
      marca,
      user_id: Number(request.user.id),
    });

    return response.json(brand);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listBrandById = container.resolve(ListBrandByIDService);

    const brand = await listBrandById.execute({
      id_brand: Number(id),
      user_id: Number(request.user.id),
    });

    return response.json(brand);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { page, pagesize } = request.query;
    const listBrand = container.resolve(ListBrandService);

    const brands = await listBrand.execute(Number(request.user.id), {
      page: Number(page),
      pagesize: Number(pagesize),
    });

    return response.json(brands);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteBrand = container.resolve(DeleteBrandService);

    await deleteBrand.execute({
      id: Number(id),
      user_id: Number(request.user.id),
    });

    return response.status(200).send();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { marca } = request.body;
    const updateBrand = container.resolve(UpdateBrandService);

    const brand = await updateBrand.execute({
      marca,
      brand_id: Number(id),
      user_id: Number(request.user.id),
    });

    return response.json(brand);
  }
}
