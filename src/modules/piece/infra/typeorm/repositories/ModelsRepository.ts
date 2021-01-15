import { getRepository, Repository } from 'typeorm';
import IModelsRepository from '@modules/piece/repositories/IModelsRepository';
import ICreateModelDTO from '@modules/piece/dtos/ICreateModelDTO';
import IListDTO from '@modules/piece/dtos/IListDTO';
import IFilterRequestList from '@shared/utils/dtos/IFilterRequestList';
import Model from '../entities/Model';

class ModelsRepository implements IModelsRepository {
  private ormRepository: Repository<Model>;

  constructor() {
    this.ormRepository = getRepository(Model);
  }

  async create({
    id_conta,
    id_estabelecimento,
    id_loja,
    id_marca,
    modelo,
  }: ICreateModelDTO): Promise<Model> {
    const brand = this.ormRepository.create({
      id_conta,
      id_estabelecimento: id_estabelecimento || 0,
      id_loja: id_loja || 0,
      id_marca,
      modelo,
      dh_inc: new Date(),
    });

    await this.ormRepository.save(brand);

    return brand;
  }

  async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async save(data: Model): Promise<Model> {
    const model = await this.ormRepository.save(data);
    return model;
  }

  async findByID(id: number, id_conta: number): Promise<Model> {
    const brand = await this.ormRepository.findOne({
      where: {
        id,
        // id_conta,
      },
    });

    return brand;
  }

  async find(
    { id_loja, id_estabelecimento, id_conta }: IListDTO,
    { search, page, pageSize }: IFilterRequestList,
  ): Promise<Model[]> {
    const searchSplit = search ? search.split(';') : [];

    let where = '';

    if (searchSplit.length === 1) {
      where = `modelo like '%${searchSplit[0]}%'`;
    }

    const brands = await this.ormRepository.find({
      where: qb => {
        qb.where(where);
      },
      skip: page ? page - 1 : 0,
      take: pageSize + 1 || 11,
      relations: ['marca', 'loja', 'estabelecimento', 'conta'],
      order: {
        id: 'DESC',
      },
    });

    return brands;
  }
}

export default ModelsRepository;