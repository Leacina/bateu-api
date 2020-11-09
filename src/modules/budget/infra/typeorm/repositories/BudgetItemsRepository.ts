import { getRepository, Repository } from 'typeorm';
import IBudgetItemsRepository from '@modules/budget/repositories/IBudgetItemsRepository';
import ICreateBudgetItemDTO from '../../../dtos/ICreateBudgetItemDTO';
import BudgetItem from '../entities/BudgetItem';

export default class BudgetItemsRepository implements IBudgetItemsRepository {
  private ormRepository: Repository<BudgetItem>;

  constructor() {
    this.ormRepository = getRepository(BudgetItem);
  }

  async create(data: ICreateBudgetItemDTO[]): Promise<BudgetItem[]> {
    const budgetItem = this.ormRepository.create(data);

    await this.ormRepository.save(budgetItem);

    return budgetItem;
  }
}
