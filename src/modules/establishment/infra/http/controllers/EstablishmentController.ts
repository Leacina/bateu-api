import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListEstablishmentByIDService from '@modules/establishment/services/ListEstablishmentByIDService';
import CreateEstablishmentService from '@modules/establishment/services/CreateEstablishmentService';

export default class AppointmentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const listEstablishment = container.resolve(ListEstablishmentByIDService);
    const establishments = await listEstablishment.execute(Number(id));

    return response.json(establishments);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      cnpj_cpf,
      id_conta,
      razao_social,
      nm_estabelecimento,
    } = request.body;

    const createEstablishment = container.resolve(CreateEstablishmentService);

    const establishment = await createEstablishment.execute({
      cnpj_cpf,
      id_conta,
      razao_social,
      nm_estabelecimento,
    });

    return response.json(establishment);
  }
}
