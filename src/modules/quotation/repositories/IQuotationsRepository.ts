import IFilterRequestList from '@shared/utils/dtos/IFilterRequestList';
import IListDTO from '@modules/piece/dtos/IListDTO';
import Quotation from '../infra/typeorm/entities/Quotation';
import ICreateQuotationDTO from '../dtos/ICreateQuotationDTO';

export default interface IQuotationsRepository {
  create(data: ICreateQuotationDTO): Promise<Quotation>;
  find(data: IListDTO, filter: IFilterRequestList): Promise<Quotation[]>;
}
