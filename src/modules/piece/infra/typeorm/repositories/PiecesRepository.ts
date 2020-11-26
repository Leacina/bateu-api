import { getRepository, Repository } from 'typeorm';
import IPiecesRepository from '@modules/piece/repositories/IPiecesRepository';
import ICreatePieceDTO from '@modules/piece/dtos/ICreatePieceDTO';
import IListDTO from '@modules/piece/dtos/IListDTO';
import IFilterRequestList from '@shared/utils/dtos/IFilterRequestList';
import Piece from '../entities/Piece';

class PiecesRepository implements IPiecesRepository {
  private ormRepository: Repository<Piece>;

  constructor() {
    this.ormRepository = getRepository(Piece);
  }

  async create(data: ICreatePieceDTO): Promise<Piece> {
    const piece = this.ormRepository.create({
      ...data,
      dh_inc: new Date(),
    });

    await this.ormRepository.save(piece);

    return piece;
  }

  async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async save(data: Piece): Promise<Piece> {
    const piece = await this.ormRepository.save(data);
    return piece;
  }

  async findByID(id: number, id_conta: number): Promise<Piece> {
    const piece = await this.ormRepository.findOne({
      where: {
        id,
        id_conta,
      },
    });

    return piece;
  }

  async find(
    where: IListDTO,
    { page, pageSize }: IFilterRequestList,
  ): Promise<Piece[]> {
    const pieces = await this.ormRepository.find({
      where,
      skip: page ? page - 1 : 0,
      take: pageSize + 1 || 11,
      relations: [
        'marca',
        'loja',
        'estabelecimento',
        'conta',
        'categoria',
        'modelo',
      ],
    });

    return pieces;
  }

  async findByCategory(
    id: number,
    id_conta: number,
    { page, pageSize }: IFilterRequestList,
  ): Promise<Piece[]> {
    const pieces = await this.ormRepository.find({
      where: {
        id_categoria: id,
        id_conta,
      },
      skip: page ? page - 1 : 0,
      take: pageSize + 1 || 11,
      relations: [
        'marca',
        'loja',
        'estabelecimento',
        'conta',
        'categoria',
        'modelo',
      ],
    });

    return pieces;
  }
}

export default PiecesRepository;
