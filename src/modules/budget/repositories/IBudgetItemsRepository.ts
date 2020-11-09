import BudgetItem from '../infra/typeorm/entities/BudgetItem';
import ICreateBudgetItemDTO from '../dtos/ICreateBudgetItemDTO';

export default interface IBudgetItemsRepository {
  create(data: ICreateBudgetItemDTO[]): Promise<BudgetItem[]>;
}
