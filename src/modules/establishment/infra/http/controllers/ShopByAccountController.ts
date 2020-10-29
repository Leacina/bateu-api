import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListShopsByAccountIDService from '@modules/establishment/services/ListShopsByAccountIDService';

export default class ShopByAccountController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const listShopsByAccount = container.resolve(ListShopsByAccountIDService);
    const shop = await listShopsByAccount.execute(Number(id));

    return response.json(shop);
  }
}
