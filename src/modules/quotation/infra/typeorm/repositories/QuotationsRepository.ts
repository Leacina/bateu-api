import { getRepository, Repository } from 'typeorm';
import IQuotationsRepository from '@modules/quotation/repositories/IQuotationsRepository';
import IListDTO from '@modules/piece/dtos/IListDTO';
import IFilterRequestList from '@shared/utils/dtos/IFilterRequestList';
import ICreateQuotationDTO from '../../../dtos/ICreateQuotationDTO';
import Quotation from '../entities/Quotation';

export default class QuotationItemsRepository implements IQuotationsRepository {
  private ormRepository: Repository<Quotation>;

  constructor() {
    this.ormRepository = getRepository(Quotation);
  }

  async create(data: ICreateQuotationDTO): Promise<Quotation> {
    const quotation = this.ormRepository.create({
      ...data,
      dh_inc: new Date(),
    });

    await this.ormRepository.save(quotation);

    return quotation;
  }

  async find(
    { id_loja, id_estabelecimento, id_conta }: IListDTO,
    { page, pageSize }: IFilterRequestList,
  ): Promise<Quotation[]> {
    const quotations = await this.ormRepository.find({
      where: {
        id_estabelecimento,
        id_loja,
        id_conta,
      },
      skip: page ? page - 1 : 0,
      take: pageSize + 1 || 11,
      relations: ['loja', 'estabelecimento', 'conta'],
    });

    return quotations;
  }
}
