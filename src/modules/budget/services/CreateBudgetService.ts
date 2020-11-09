import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import * as yup from 'yup';
import IBudgetsRepository from '../repositories/IBudgetsRepository';
import Budget from '../infra/typeorm/entities/Budget';
import IBudgetItemsRepository from '../repositories/IBudgetItemsRepository';
import BudgetItems from '../infra/typeorm/entities/BudgetItem';

interface IRequest {
  id_produto: number;
  quantidade_solicitada: number;
  valor_orcamento: number;
}

interface IResponse {
  orcamento: Budget;
  itens: BudgetItems;
}

@injectable()
export default class CreateBudgetService {
  constructor(
    @inject('BudgetsRepository')
    private budgetsRepository: IBudgetsRepository,

    @inject('BudgetItemsRepository')
    private budgetItemsRepository: IBudgetItemsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(items: IRequest[]): Promise<IResponse> {
    // Validações necessárias para criar o usuário
    const schema = yup.object().shape({
      id_produto: yup.number().required('Existem produtos não informado'),
      quantidade_solicitada: yup
        .number()
        .required('Existem produto sem quantidade'),
      valor_orcamento: yup
        .number()
        .required('Existe produto sem valor de orçamento'),
    });

    // Caso houver algum erro retorna com status 422
    await schema.validate(items).catch(err => {
      throw new AppError(err.message, 422);
    });

    for (let i = 0; i < items.length; i++) {
      console.log(items[i]);
    }

    return {
      orcamento: new Budget(),
      itens: new BudgetItems(),
    };
  }
}
