import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListPiecesByCategoryService from '@modules/piece/services/ListPiecesByCategoryService';

export default class PiecesByShopController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { page, pageSize } = request.query;

    const listPieceByCategory = container.resolve(ListPiecesByCategoryService);

    const piece = await listPieceByCategory.execute({
      id: Number(id),
      filter: { page: Number(page), pageSize: Number(pageSize) },
      user_id: Number(request.user.id),
    });

    return response.json(piece);
  }
}
