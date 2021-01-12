/**
 * Injeção de dependências
 */
import { container } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import IAccountsRepository from '../repositories/IAccountsRepository';
import AccountsRepository from '../infra/typeorm/repositories/AccountsRepository';
import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';
import IPerfilRepository from '../repositories/IPerfilRepository';
import PerfilRepository from '../infra/typeorm/repositories/PerfilRepository';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IAccountsRepository>(
  'AccountsRepository',
  AccountsRepository,
);

container.registerSingleton<IPerfilRepository>(
  'PerfilRepository',
  PerfilRepository,
);
