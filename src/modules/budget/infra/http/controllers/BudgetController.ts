import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListBudgetsService from '@modules/budget/services/ListBugetsService';
import ListBudgetByIdService from '@modules/budget/services/ListBudgetByIdService';

export default class BudgetsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { page, pageSize } = request.query;

    const listBudgets = container.resolve(ListBudgetsService);

    const brands = await listBudgets.execute(Number(3), {
      page: Number(page),
      pageSize: Number(pageSize),
    });
    return response.json(brands);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listBudgetByIdService = container.resolve(ListBudgetByIdService);

    const brands = await listBudgetByIdService.execute(Number(id), Number(3));
    return response.json(brands);
  }
}
