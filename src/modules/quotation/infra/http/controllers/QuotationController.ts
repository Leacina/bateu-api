import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListQuotationsService from '@modules/quotation/services/ListQuotationsService';

export default class QuotationsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { page, pageSize } = request.query;

    const listQuotationsService = container.resolve(ListQuotationsService);

    const quotations = await listQuotationsService.execute(
      Number(request.user.id),
      {
        page: Number(page),
        pageSize: Number(pageSize),
      },
    );
    return response.json(quotations);
  }
}
