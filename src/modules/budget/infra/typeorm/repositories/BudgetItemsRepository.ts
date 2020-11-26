import { getRepository, Repository } from 'typeorm';
import IBudgetItemsRepository from '@modules/budget/repositories/IBudgetItemsRepository';
import IListDTO from '@modules/piece/dtos/IListDTO';
import IFilterRequestList from '@shared/utils/dtos/IFilterRequestList';
import IProcessBudgetItemsDTO from '@modules/budget/dtos/IProcessBudgetItemsDTO';
import ICreateBudgetItemDTO from '../../../dtos/ICreateBudgetItemDTO';
import BudgetItem from '../entities/BudgetItem';
import Budget from '../entities/Budget';

export default class BudgetItemsRepository implements IBudgetItemsRepository {
  private ormRepository: Repository<BudgetItem>;

  private ormRepositoryBudget: Repository<Budget>;

  constructor() {
    this.ormRepository = getRepository(BudgetItem);
    this.ormRepositoryBudget = getRepository(Budget);
  }

  async create(data: ICreateBudgetItemDTO[]): Promise<BudgetItem[]> {
    const budgetItem = this.ormRepository.create(data);

    await this.ormRepository.save(budgetItem);

    return budgetItem;
  }

  async find(
    budget_id: number,
    { id_loja, id_estabelecimento, id_conta }: IListDTO,
    { page, pageSize }: IFilterRequestList,
  ): Promise<BudgetItem[]> {
    const budgetItems = await this.ormRepository.find({
      where: {
        id_orcamento: budget_id,
        // id_conta,
      },
      skip: page ? page - 1 : 0,
      take: pageSize + 1 || 11,
      relations: ['orcamento', 'peca', 'conta'],
    });

    return budgetItems;
  }

  async process({
    budget_item_id,
    isConfirm,
  }: IProcessBudgetItemsDTO): Promise<BudgetItem> {
    const budgetItem = await this.ormRepository.findOne({
      where: {
        id: budget_item_id,
        // id_conta,
      },
    });

    // eslint-disable-next-line no-unused-expressions
    budgetItem as BudgetItem;

    // Altera estado produto
    budgetItem.situacao = isConfirm ? 'Confirmado' : 'Cancelado';

    // Save
    await this.ormRepository.save(budgetItem);

    // Busca para verificar se todos estão cancelados/confirmados/pendentes
    const budgetItems = await this.ormRepository.find({
      where: {
        id_orcamento: budgetItem.id_orcamento,
        situacao: 'Pendente',
      },
    });

    // Busca o orçamento para alterar a situação
    const budget = await this.ormRepositoryBudget.findOne({
      where: {
        id: budgetItem.id_orcamento,
      },
    });

    // eslint-disable-next-line no-unused-expressions
    budget as Budget;

    // Se encontrou alguma coisa, então ainda esta parcial... Pois existe items
    // a ser confirmado/cancelado ainda
    if (budgetItems.length === 0) {
      budget.situacao = budgetItem.situacao;
    } else {
      budget.situacao = 'Parcial';
    }

    // Save
    await this.ormRepositoryBudget.save(budget);

    return budgetItem;
  }
}
