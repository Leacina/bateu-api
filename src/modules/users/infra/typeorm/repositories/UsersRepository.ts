import { getRepository, Repository } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    ds_login,
    tp_usuario,
    ds_senha,
    telefone,
    nm_usuario,
    is_ativo,
    id_perfil,
    id_loja,
    id_estabelecimento,
    id_conta,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      ds_login,
      tp_usuario,
      ds_senha,
      telefone,
      nm_usuario,
      is_ativo,
      id_perfil,
      id_loja,
      id_estabelecimento,
      id_conta,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        ds_login: email,
      },
    });

    return user;
  }
}

export default UsersRepository;
