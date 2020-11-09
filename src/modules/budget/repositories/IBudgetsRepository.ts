import Budget from '../infra/typeorm/entities/Budget';
import ICreateBudgetDTO from '../dtos/ICreateBudgetDTO';

export default interface IBudgetsRepository {
  create(data: ICreateBudgetDTO): Promise<Budget>;
}
