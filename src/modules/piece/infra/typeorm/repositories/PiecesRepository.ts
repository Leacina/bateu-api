import { getRepository, Repository } from 'typeorm';
import IPiecesRepository from '@modules/piece/repositories/IPiecesRepository';
import ICreatePieceDTO from '@modules/piece/dtos/ICreatePieceDTO';
import IListDTO from '@modules/piece/dtos/IListDTO';
import IFilterRequestList from '@shared/utils/dtos/IFilterRequestList';
import FindFilters from '@shared/utils/implementations/common';
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
      },
    });

    return piece;
  }

  async find(
    { id_conta, id_estabelecimento, id_loja }: IListDTO,
    { search, page, pageSize }: IFilterRequestList,
  ): Promise<Piece[]> {
    const pieces = await this.ormRepository.find({
      join: {
        alias: 'piece',
      },
      where: qb => {
        qb.where(
          `${this.getWhere(
            search,
          )} and piece.id_estabelecimento = ${id_estabelecimento} and piece.id_loja = ${id_loja}`,
        );
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
      order: {
        id: 'DESC',
      },
    });

    return pieces;
  }

  async findByShop({
    id_estabelecimento,
    id_loja,
  }: IListDTO): Promise<Piece[]> {
    const pieces = await this.ormRepository.find({
      where: qb => {
        qb.where(
          `id_estabelecimento = ${id_estabelecimento} and id_loja = ${id_loja}`,
        );
      },
      order: {
        id: 'DESC',
      },
    });

    return pieces;
  }

  async findBySpotlight(
    { id_conta, id_estabelecimento, id_loja }: IListDTO,
    { search, page, pageSize }: IFilterRequestList,
  ): Promise<Piece[]> {
    const searchSplit = search ? search.split(';') : [];
    const findFilters = new FindFilters(searchSplit);

    let whereEstablishment = '';

    if (searchSplit.length > 1) {
      whereEstablishment = ` and piece.id_estabelecimento = ${findFilters.findSearch(
        'id_estabelecimento',
      )} and
      piece.id_loja = ${findFilters.findSearch('id_loja')}`;
    }

    const pieces = await this.ormRepository.find({
      join: {
        alias: 'piece',
      },
      where: qb => {
        qb.where(
          `${
            this.getWhere(search) + whereEstablishment
          } and piece.peca_destaque = 1`,
        );
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
      order: {
        id: 'DESC',
      },
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
      order: {
        id: 'DESC',
      },
    });

    return pieces;
  }

  async count({
    id_conta,
    id_estabelecimento,
    id_loja,
  }: IListDTO): Promise<number> {
    const count = await this.ormRepository.count({
      where: {
        id_estabelecimento,
        id_loja,
      },
    });

    return count;
  }

  getWhere(search: string): string {
    const searchSplit = search ? search.split(';') : [];
    const findFilters = new FindFilters(searchSplit);

    let where = 'true ';

    // Se for filtro avançado, procurar por cada campos
    if (searchSplit.length > 1) {
      where += `and piece.nm_peca like '%${findFilters.findSearch(
        'nm_peca',
      )}%' and
      piece.descricao_peca like '%${findFilters.findSearch(
        'descricao_peca',
      )}%'`;
    } else if (searchSplit.length === 1) {
      where += `and (piece.nm_peca like '%${searchSplit[0]}%' or
      piece.descricao_peca like '%${searchSplit[0]}%')`;
    }

    return where;
  }
}

export default PiecesRepository;
