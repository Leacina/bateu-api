import { getRepository, Repository } from 'typeorm';
import ICategoriesRepository from '@modules/piece/repositories/ICategoriesRepository';
import ICreateCategoryDTO from '@modules/piece/dtos/ICreateCategoryDTO';
import IFilterRequestList from '@shared/utils/dtos/IFilterRequestList';
import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  async create({ categoria, id_conta }: ICreateCategoryDTO): Promise<Category> {
    const brand = this.ormRepository.create({
      categoria,
      id_conta,
      dh_inc: new Date(),
    });

    await this.ormRepository.save(brand);

    return brand;
  }

  async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async save(data: Category): Promise<Category> {
    const category = await this.ormRepository.save(data);
    return category;
  }

  async findByID(id: number, id_conta: number): Promise<Category> {
    const category = await this.ormRepository.findOne({
      where: {
        id,
        id_conta,
      },
    });

    return category;
  }

  async find(
    id_conta: number,
    { page, pagesize }: IFilterRequestList,
  ): Promise<Category[]> {
    const categories = await this.ormRepository.find({
      where: {
        id_conta,
      },
      skip: page ? page - 1 : 0,
      take: pagesize + 1 || 11,
      relations: ['conta'],
    });

    return categories;
  }
}

export default CategoriesRepository;
