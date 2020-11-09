import { getRepository, Repository } from 'typeorm';
import IBudgetsRepository from '@modules/budget/repositories/IBudgetsRepository';
import ICreateBudgetDTO from '../../../dtos/ICreateBudgetDTO';
import Budget from '../entities/Budget';

export default class BudgetItemsRepository implements IBudgetsRepository {
  private ormRepository: Repository<Budget>;

  constructor() {
    this.ormRepository = getRepository(Budget);
  }

  async create(data: ICreateBudgetDTO): Promise<Budget> {
    const budget = this.ormRepository.create({
      ...data,
      dh_inc: new Date(),
    });

    await this.ormRepository.save(budget);

    return budget;
  }
}
