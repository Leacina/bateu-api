import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListPiecesByEstablishmentService from '@modules/piece/services/ListPiecesByEstablishmentService';

export default class PiecesByShopController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { page, pagesize } = request.query;

    const listPieceByEstablishment = container.resolve(
      ListPiecesByEstablishmentService,
    );

    const piece = await listPieceByEstablishment.execute({
      id_estabelecimento: Number(id),
      filter: { page: Number(page), pagesize: Number(pagesize) },
      user_id: Number(request.user.id),
    });

    return response.json(piece);
  }
}
