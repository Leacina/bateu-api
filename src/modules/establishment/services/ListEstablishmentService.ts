import { injectable, inject } from 'tsyringe';
import IResponseList from '@shared/utils/dtos/IResponseList';
import IEstablishmentsRepository from '../repositories/IEstablishmentsRepository';

@injectable()
class ListEstablishmentService {
  /**
   * Realiza a injeção de dependencia de acordo com a pasta Provider.
   * @param establishmentsRepository
   */
  constructor(
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ) {}

  public async execute(): Promise<IResponseList | undefined> {
    const establishment = await this.establishmentsRepository.find();

    return { hasNext: true, items: establishment };
  }
}

export default ListEstablishmentService;
