/**
 * Injeção de dependências
 */
import { container } from 'tsyringe';

import IBrandsRepository from '../repositories/IBrandsRepository';
import BrandsRepository from '../infra/typeorm/repositories/BrandsRepository';

import IModelsRepository from '../repositories/IModelsRepository';
import ModelsRepository from '../infra/typeorm/repositories/ModelsRepository';

import ICategoriesRepository from '../repositories/ICategoriesRepository';
import CategoriesRepository from '../infra/typeorm/repositories/CategoriesRepository';

import IPiecesRepository from '../repositories/IPiecesRepository';
import PiecesRepository from '../infra/typeorm/repositories/PiecesRepository';

container.registerSingleton<IBrandsRepository>(
  'BrandsRepository',
  BrandsRepository,
);

container.registerSingleton<IModelsRepository>(
  'ModelsRepository',
  ModelsRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<IPiecesRepository>(
  'PiecesRepository',
  PiecesRepository,
);
