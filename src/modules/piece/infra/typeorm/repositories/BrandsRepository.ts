import { getRepository, Repository } from 'typeorm';
import IBrandsRepository from '@modules/piece/repositories/IBrandsRepository';
import ICreateBrandDTO from '@modules/piece/dtos/ICreateBrandDTO';
import IListBrandDTO from '@modules/piece/dtos/IListDTO';
import IFilterRequestList from '@shared/utils/dtos/IFilterRequestList';
import Brand from '../entities/Brand';

class BrandsRepository implements IBrandsRepository {
  private ormRepository: Repository<Brand>;

  constructor() {
    this.ormRepository = getRepository(Brand);
  }

  async create({
    id_conta,
    id_estabelecimento,
    id_loja,
    marca,
  }: ICreateBrandDTO): Promise<Brand> {
    const brand = this.ormRepository.create({
      id_conta,
      id_estabelecimento: id_estabelecimento || 0,
      id_loja: id_loja || 0,
      marca,
      dh_inc: new Date(),
    });

    await this.ormRepository.save(brand);

    return brand;
  }

  async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async save(data: Brand): Promise<Brand> {
    const brand = await this.ormRepository.save(data);
    return brand;
  }

  async findByID(id: number, id_conta: number): Promise<Brand> {
    const brand = await this.ormRepository.findOne({
      where: {
        id,
        id_conta,
      },
    });

    return brand;
  }

  async find(
    where: IListBrandDTO,
    { page, pageSize }: IFilterRequestList,
  ): Promise<Brand[]> {
    const brands = await this.ormRepository.find({
      where,
      skip: page ? page - 1 : 0,
      take: pageSize + 1 || 11,
      relations: ['loja', 'estabelecimento', 'conta'],
    });

    return brands;
  }
}

export default BrandsRepository;
