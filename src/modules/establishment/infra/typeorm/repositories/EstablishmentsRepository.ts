import { getRepository, Repository } from 'typeorm';
import IEstablishmentsRepository from '@modules/establishment/repositories/IEstablishmentsRepository';
import ICreateEstablishmentDTO from '@modules/establishment/dtos/ICreateEstablishmentDto';

import Establishment from '../entities/Establishment';

export default class EstablishmentRepository
  implements IEstablishmentsRepository {
  private ormRepository: Repository<Establishment>;

  constructor() {
    this.ormRepository = getRepository(Establishment);
  }

  async findById(id: number): Promise<Establishment | undefined> {
    const establishment = await this.ormRepository.findOne(id);
    return establishment;
  }

  async findByAccountId(id: number): Promise<Establishment[] | undefined> {
    const establishment = await this.ormRepository.find({
      where: { id_conta: id },
    });

    return establishment;
  }

  async find(): Promise<Establishment[] | undefined> {
    const establishment = await this.ormRepository.find();

    return establishment;
  }

  async create(
    data: ICreateEstablishmentDTO,
  ): Promise<Establishment | undefined> {
    const establishmentObject = { ...data, dh_inc: new Date() };
    const establishment = this.ormRepository.create(establishmentObject);

    await this.ormRepository.save(establishment);

    return establishment;
  }

  async save(establishment: Establishment): Promise<Establishment> {
    return this.ormRepository.save(establishment);
  }
}
