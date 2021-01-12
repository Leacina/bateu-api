import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IResponseList from '@shared/utils/dtos/IResponseList';
import IFilterRequestList from '@shared/utils/dtos/IFilterRequestList';
import ListResponse from '@shared/utils/implementations/AppListResponse';
import IPiecesRepository from '../repositories/IPiecesRepository';

@injectable()
export default class ListPieceBySpotlightService {
  constructor(
    @inject('PiecesRepository')
    private piecesRepository: IPiecesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    user_id: number,
    filter?: IFilterRequestList,
  ): Promise<IResponseList> {
    console.log('sdadas');
    console.log(user_id);
    console.log('sdadas');
    const {
      id_estabelecimento,
      id_loja,
      id_conta,
    } = await this.usersRepository.findById(user_id);

    const pieces = await this.piecesRepository.findBySpotlight(
      {
        id_estabelecimento,
        id_loja,
        id_conta,
      },
      filter,
    );

    return new ListResponse(pieces, filter.page, filter.pageSize);
  }
}
