import { inject, injectable } from 'tsyringe';
import IBudgetItemsRepository from '../repositories/IBudgetItemsRepository';
import BudgetItem from '../infra/typeorm/entities/BudgetItem';

interface IRequest {
  budget_item_id: number;
  isConfirm: boolean;
}

@injectable()
export default class UpdateBudgetItemProcessService {
  constructor(
    @inject('BudgetItemsRepository')
    private budgetItemsRepository: IBudgetItemsRepository,
  ) {}

  public async execute({
    budget_item_id,
    isConfirm,
  }: IRequest): Promise<BudgetItem> {
    const budgetItem = await this.budgetItemsRepository.process({
      budget_item_id,
      isConfirm,
    });

    return budgetItem;
  }
}
