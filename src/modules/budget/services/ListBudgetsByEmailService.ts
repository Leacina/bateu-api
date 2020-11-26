import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IResponseList from '@shared/utils/dtos/IResponseList';
import IFilterRequestList from '@shared/utils/dtos/IFilterRequestList';
import ListResponse from '@shared/utils/implementations/AppListResponse';
import IBudgetsRepository from '../repositories/IBudgetsRepository';

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
  ): Promise<IResponseList> {
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

    return new ListResponse(budgets, filter.page, filter.pageSize);
  }
}
