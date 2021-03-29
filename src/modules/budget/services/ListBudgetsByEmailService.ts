/* eslint-disable no-param-reassign */
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import IResponseList from '@shared/utils/dtos/IResponseList';
import IFilterRequestList from '@shared/utils/dtos/IFilterRequestList';
import ListResponse from '@shared/utils/implementations/AppListResponse';
import IBudgetsRepository from '../repositories/IBudgetsRepository';
import Budget from '../infra/typeorm/entities/Budget';

@injectable()
export default class ListBudgetsByEmailService {
  constructor(
    @inject('BudgetsRepository') private budgetsRepository: IBudgetsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    budget_email: string,
    user_id: number,
    filter?: IFilterRequestList,
  ): Promise<Budget[]> {
    const {
      id_conta,
      id_estabelecimento,
      id_loja,
    } = await this.usersRepository.findById(user_id);

    const budgets = await this.budgetsRepository.findByEmail(
      budget_email,
      {
        id_conta,
        id_estabelecimento,
        id_loja,
      },
      filter,
    );

    budgets.map(budget => {
      if (budget.situacao === 'P') {
        budget.situacao = 'Pendente';
      } else if (budget.situacao === 'VP') {
        budget.situacao = 'Venda Parcial';
      } else if (budget.situacao === 'VI') {
        budget.situacao = 'Venda Integral';
      } else if (budget.situacao === 'C') {
        budget.situacao = 'Cancelado';
      }

      return budget;
    });

    return budgets;
  }
}
