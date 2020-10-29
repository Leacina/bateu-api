import Shop from '../infra/typeorm/entities/Shop';
import ICreateShop from '../dtos/ICreateShopDTO';

export default interface IShopRepository {
  findById(id: number): Promise<Shop | undefined>;
  findByAccountId(id: number): Promise<Shop[] | undefined>;
  create(data: ICreateShop): Promise<Shop | undefined>;
}
