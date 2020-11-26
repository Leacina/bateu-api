import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IResponseList from '@shared/utils/dtos/IResponseList';
import IFilterRequestList from '@shared/utils/dtos/IFilterRequestList';
import ListResponse from '@shared/utils/implementations/AppListResponse';
import IPiecesRepository from '../repositories/IPiecesRepository';

interface IRequest {
  user_id: number;
  id_loja: number;
  filter?: IFilterRequestList;
}

@injectable()
export default class ListPiecesByShopService {
  constructor(
    @inject('PiecesRepository') private piecesRepository: IPiecesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    filter,
    id_loja,
    user_id,
  }: IRequest): Promise<IResponseList> {
    const { id_conta } = await this.usersRepository.findById(user_id);

    const pieces = await this.piecesRepository.find(
      {
        id_conta,
        id_loja,
      },
      filter,
    );

    return new ListResponse(pieces, filter.page, filter.pageSize);
  }
}
