import { injectable, inject } from 'tsyringe';
import * as yup from 'yup';
import AppError from '@shared/errors/AppError';
import IAccountsRepository from '@modules/users/repositories/IAccountsRepository';
import Establishment from '../infra/typeorm/entities/Establishment';
import IEstablishmentsRepository from '../repositories/IEstablishmentsRepository';
import ICreateEstablishmentDto from '../dtos/ICreateEstablishmentDto';

@injectable()
export default class CreateEstablishmentService {
  /**
   * Realiza a injeção de dependencia de acordo com a pasta Provider.
   * @param establishmentsRepository
   */
  constructor(
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,

    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) {}

  public async execute({
    cnpj_cpf,
    id_conta,
    nm_estabelecimento,
    razao_social,
  }: ICreateEstablishmentDto): Promise<Establishment | undefined> {
    // Validações necessárias para criar o usuário
    const schema = yup.object().shape({
      cnpj_cpf: yup.string().required('CPF/CNPJ não informado'),
      id_conta: yup.number().required('Conta não informada'),
      nm_estabelecimento: yup
        .string()
        .required('Nome da empresa não informado'),
      razao_social: yup.string().required('Razão social não informada'),
    });

    // Caso houver algum erro retorna com status 422
    await schema
      .validate({
        cnpj_cpf,
        id_conta,
        nm_estabelecimento,
        razao_social,
      })
      .catch(err => {
        throw new AppError(err.message, 422);
      });

    const account = await this.accountsRepository.findById(id_conta);
    if (!account) {
      throw new AppError('Conta informada não encontrada', 422);
    }

    const establishment = await this.establishmentsRepository.create({
      cnpj_cpf,
      id_conta,
      nm_estabelecimento,
      razao_social,
    });

    return establishment;
  }
}
