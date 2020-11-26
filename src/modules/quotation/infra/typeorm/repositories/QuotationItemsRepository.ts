import { getRepository, Repository } from 'typeorm';
import IQuotationItemsRepository from '@modules/quotation/repositories/IQuotationItemsRepository';
import IListDTO from '@modules/piece/dtos/IListDTO';
import IFilterRequestList from '@shared/utils/dtos/IFilterRequestList';
import IProcessQuotationItemsDTO from '@modules/quotation/dtos/IProcessQuotationItemsDTO';
import IUpdateValueQuotationItemDTO from '@modules/quotation/dtos/IUpdateValueQuotationDTO';
import ICreateQuotationItemDTO from '../../../dtos/ICreateQuotationItemDTO';
import QuotationItem from '../entities/QuotationItem';
import Quotation from '../entities/Quotation';

export default class QuotationItemsRepository
  implements IQuotationItemsRepository {
  private ormRepository: Repository<QuotationItem>;

  private ormRepositoryQuotation: Repository<Quotation>;

  constructor() {
    this.ormRepository = getRepository(QuotationItem);
    this.ormRepositoryQuotation = getRepository(Quotation);
  }

  async create(data: ICreateQuotationItemDTO[]): Promise<QuotationItem[]> {
    const quotationItem = this.ormRepository.create(data);

    await this.ormRepository.save(quotationItem);

    return quotationItem;
  }

  async find(
    quotation_identifier: string,
    { id_loja, id_estabelecimento, id_conta }: IListDTO,
    { page, pageSize }: IFilterRequestList,
  ): Promise<QuotationItem[]> {
    const quotationItems = await this.ormRepository.find({
      where: {
        identificador_cotacao: quotation_identifier.split('_').join(' '),
        // id_conta,
      },
      skip: page ? page - 1 : 0,
      take: pageSize + 1 || 11,
      relations: ['cotacao', 'conta'],
    });

    return quotationItems;
  }

  async process({
    quotation_item_id,
    isConfirm,
  }: IProcessQuotationItemsDTO): Promise<QuotationItem> {
    const quotationItem = await this.ormRepository.findOne({
      where: {
        id: quotation_item_id,
        // id_conta,
      },
    });

    // eslint-disable-next-line no-unused-expressions
    quotationItem as QuotationItem;

    // Altera estado produto
    quotationItem.situacao = isConfirm ? 'Confirmado' : 'Cancelado';

    // Save
    await this.ormRepository.save(quotationItem);

    // Busca para verificar se todos estão cancelados/confirmados/pendentes
    const quotationItems = await this.ormRepository.find({
      where: {
        id_cotacao: quotationItem.id_cotacao,
        situacao: 'Pendente',
      },
    });

    // Busca a cotação para alterar a situação
    const quotation = await this.ormRepositoryQuotation.find({
      where: {
        identificador_cotacao: quotationItem.identificador_cotacao,
      },
    });

    // eslint-disable-next-line no-unused-expressions
    quotation as Quotation[];

    // Se encontrou alguma coisa, então ainda esta parcial... Pois existe items
    // a ser confirmado/cancelado ainda
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < quotation.length; i++) {
      if (quotationItems.length === 0) {
        quotation[i].situacao = quotationItem.situacao;
      } else {
        quotation[i].situacao = 'Parcial';
      }
    }

    // Save
    await this.ormRepositoryQuotation.save(quotation);

    return quotationItem;
  }

  async updateValue({
    id,
    value,
  }: IUpdateValueQuotationItemDTO): Promise<QuotationItem> {
    const quotationItem = await this.ormRepository.findOne({
      where: {
        id,
        // id_conta,
      },
    });

    // eslint-disable-next-line no-unused-expressions
    quotationItem as QuotationItem;

    // Altera estado produto
    quotationItem.valor_peca = value;

    // Save
    await this.ormRepository.save(quotationItem);

    return quotationItem;
  }
}
