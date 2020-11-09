import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IResponseList from '@shared/utils/dtos/IResponseList';
import IFilterRequestList from '@shared/utils/dtos/IFilterRequestList';
import ListResponse from '@shared/utils/implementations/AppListResponse';
import IPiecesRepository from '../repositories/IPiecesRepository';

interface IRequest {
  user_id: number;
  id: number;
  filter?: IFilterRequestList;
}

@injectable()
export default class ListPiecesByCategoryService {
  constructor(
    @inject('PiecesRepository') private piecesRepository: IPiecesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    id,
    user_id,
    filter,
  }: IRequest): Promise<IResponseList> {
    const { id_conta } = await this.usersRepository.findById(user_id);

    const pieces = await this.piecesRepository.findByCategory(
      id,
      id_conta,
      filter,
    );

    return new ListResponse(pieces, filter.page, filter.pagesize);
  }
}
