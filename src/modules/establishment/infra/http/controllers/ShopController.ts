import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListShopByIDService from '@modules/establishment/services/ListShopByIDService';
import CreateShopService from '@modules/establishment/services/CreateShopService';

export default class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const listShop = container.resolve(ListShopByIDService);

    const shop = await listShop.execute(Number(id));

    return response.json(shop);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createShop = container.resolve(CreateShopService);
    const shop = await createShop.execute(request.body);

    return response.json(shop);
  }
}
