import { injectable, inject } from 'tsyringe';
import * as yup from 'yup';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Establishment from '../infra/typeorm/entities/Establishment';
import IEstablishmentsRepository from '../repositories/IEstablishmentsRepository';

export interface IRequest {
  nm_estabelecimento: string;
  razao_social: string;
  cnpj_cpf: string;
}

@injectable()
export default class CreateEstablishmentService {
  /**
   * Realiza a injeção de dependencia de acordo com a pasta Provider.
   * @param establishmentsRepository
   */
  constructor(
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    { cnpj_cpf, nm_estabelecimento, razao_social }: IRequest,
    user_id: number,
  ): Promise<Establishment | undefined> {
    // Validações necessárias para criar o usuário
    const schema = yup.object().shape({
      cnpj_cpf: yup.string().required('CPF/CNPJ não informado'),
      nm_estabelecimento: yup
        .string()
        .required('Nome da empresa não informado'),
      razao_social: yup.string().required('Razão social não informada'),
    });

    // Caso houver algum erro retorna com status 422
    await schema
      .validate({
        cnpj_cpf,
        nm_estabelecimento,
        razao_social,
      })
      .catch(err => {
        throw new AppError(err.message, 422);
      });

    const user = await this.usersRepository.findById(user_id);

    const establishment = await this.establishmentsRepository.create({
      cnpj_cpf,
      id_conta: user.id_conta,
      nm_estabelecimento,
      razao_social,
    });

    return establishment;
  }
}
