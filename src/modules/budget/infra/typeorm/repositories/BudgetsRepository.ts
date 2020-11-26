import { getRepository, Repository } from 'typeorm';
import IBudgetsRepository from '@modules/budget/repositories/IBudgetsRepository';
import IListDTO from '@modules/piece/dtos/IListDTO';
import IFilterRequestList from '@shared/utils/dtos/IFilterRequestList';
import IProcessBudgetDTO from '@modules/budget/dtos/IProcessBudgetDTO';
import ICreateBudgetDTO from '../../../dtos/ICreateBudgetDTO';
import Budget from '../entities/Budget';

export default class BudgetsRepository implements IBudgetsRepository {
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

  async find(
    { id_loja, id_estabelecimento, id_conta }: IListDTO,
    { page, pageSize }: IFilterRequestList,
  ): Promise<Budget[]> {
    const budgets = await this.ormRepository.find({
      where: {
        id_estabelecimento,
        id_loja,
        id_conta,
      },
      skip: page ? page - 1 : 0,
      take: pageSize + 1 || 11,
      relations: ['loja', 'estabelecimento', 'conta'],
    });

    return budgets;
  }

  async findByEmail(
    budget_email: string,
    { id_loja, id_estabelecimento, id_conta }: IListDTO,
    { page, pageSize }: IFilterRequestList,
  ): Promise<Budget[]> {
    const budgets = await this.ormRepository.find({
      where: {
        emitente_email: budget_email,
        id_estabelecimento,
        id_loja,
        id_conta,
      },
      skip: page ? page - 1 : 0,
      take: pageSize + 1 || 11,
      relations: ['loja', 'estabelecimento', 'conta'],
    });

    return budgets;
  }

  async process(
    { budget_id, isConfirm }: IProcessBudgetDTO,
    { id_conta, id_loja, id_estabelecimento }: IListDTO,
  ): Promise<Budget> {
    const budget = await this.ormRepository.findOne({
      where: {
        id: budget_id,
        id_estabelecimento,
        id_loja,
        id_conta,
      },
    });

    // eslint-disable-next-line no-unused-expressions
    budget as Budget;

    budget.situacao = isConfirm ? 'Confirmado' : 'Cancelado';

    await this.ormRepository.save(budget);

    return budget;
  }

  async findById(
    id: number,
    { id_loja, id_estabelecimento, id_conta }: IListDTO,
  ): Promise<Budget> {
    const budgets = await this.ormRepository.findOne({
      where: {
        id,
        id_estabelecimento,
        id_loja,
        id_conta,
      },
      relations: ['loja', 'estabelecimento', 'conta'],
    });

    return budgets;
  }
}
