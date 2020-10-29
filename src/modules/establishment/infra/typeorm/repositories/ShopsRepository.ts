import { Repository, getRepository } from 'typeorm';
import IShopsRepository from '@modules/establishment/repositories/IShopsRepository';
import ICreateShopDTO from '@modules/establishment/dtos/ICreateShopDTO';
import Shop from '../entities/Shop';

export default class ShopRepository implements IShopsRepository {
  private ormRepository: Repository<Shop>;

  constructor() {
    this.ormRepository = getRepository(Shop);
  }

  async findById(id: number): Promise<Shop | undefined> {
    const shop = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return shop;
  }

  async findByAccountId(id: number): Promise<Shop[] | undefined> {
    const shop = await this.ormRepository.find({
      where: {
        id_conta: id,
      },
    });

    return shop;
  }

  async create(data: ICreateShopDTO): Promise<Shop | undefined> {
    const shop = this.ormRepository.create(data);

    await this.ormRepository.save(shop);

    return shop;
  }
}
