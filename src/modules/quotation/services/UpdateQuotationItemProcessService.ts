import { inject, injectable } from 'tsyringe';
import IQuotationItemsRepository from '../repositories/IQuotationItemsRepository';
import QuotationItem from '../infra/typeorm/entities/QuotationItem';

interface IRequest {
  quotation_item_id: number;
  isConfirm: boolean;
}

@injectable()
export default class UpdateQuotationItemProcessService {
  constructor(
    @inject('QuotationItemsRepository')
    private quotationItemsRepository: IQuotationItemsRepository,
  ) {}

  public async execute({
    quotation_item_id,
    isConfirm,
  }: IRequest): Promise<QuotationItem> {
    const budgetItem = await this.quotationItemsRepository.process({
      quotation_item_id,
      isConfirm,
    });

    return budgetItem;
  }
}
