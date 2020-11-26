import { inject, injectable } from 'tsyringe';
import IQuotationItemsRepository from '../repositories/IQuotationItemsRepository';
import QuotationItem from '../infra/typeorm/entities/QuotationItem';

interface IRequest {
  id: number;
  value: number;
}

@injectable()
export default class UpdateValueItemQuotationProcessService {
  constructor(
    @inject('QuotationItemsRepository')
    private quotationItemsRepository: IQuotationItemsRepository,
  ) {}

  public async execute({ id, value }: IRequest): Promise<QuotationItem> {
    const budgetItem = await this.quotationItemsRepository.updateValue({
      id,
      value,
    });

    return budgetItem;
  }
}
