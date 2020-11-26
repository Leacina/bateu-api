import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Piece from '@modules/piece/infra/typeorm/entities/Piece';
import IPiecesRepository from '../repositories/IPiecesRepository';

interface IRequest {
  id: number;
  id_marca?: number;
  id_modelo?: number;
  id_categoria?: number;
  nm_peca?: string;
  valor_peca?: number;
  valor_peca_oficina?: number;
  valor_peca_seguradora?: number;
  qt_disponivel?: number;
  qt_estoque?: number;
  ano_inicial?: number;
  codigo_peca?: string;
  is_promocional?: string;
  altura?: number;
  largura?: number;
  comprimento?: number;
  peso_bruto?: number;
  cor?: string;
  condicao_peca?: string;
  ano_final?: string;
  descricao_peca?: string;
  user_id: number;
}

@injectable()
export default class ListPieceService {
  constructor(
    @inject('PiecesRepository') private piecesRepository: IPiecesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(data: IRequest): Promise<Piece> {
    const user = await this.usersRepository.findById(data.user_id);
    const piece = await this.piecesRepository.findByID(data.id, user.id_conta);

    // TODO: Rever essa atribuição
    if (piece) {
      piece.id_categoria = data.id_categoria || piece.id_categoria;
      piece.ano_final = data.ano_final || piece.ano_final;
      piece.ano_inicial = data.ano_inicial || piece.ano_inicial;
      piece.codigo_peca = data.codigo_peca || piece.codigo_peca;
      piece.comprimento = data.comprimento || piece.comprimento;
      piece.condicao_peca = data.condicao_peca || piece.condicao_peca;
      piece.cor = data.cor || piece.cor;
      piece.descricao_peca = data.descricao_peca || piece.descricao_peca;
      piece.id_marca = data.id_marca || piece.id_marca;
      piece.id_modelo = data.id_modelo || piece.id_modelo;
      piece.is_promocional = data.is_promocional || piece.is_promocional;
      piece.largura = data.largura || piece.largura;
      piece.nm_peca = data.nm_peca || piece.nm_peca;
      piece.peso_bruto = data.peso_bruto || piece.peso_bruto;
      piece.qt_disponivel = data.qt_disponivel || piece.qt_disponivel;
      piece.qt_estoque = data.qt_estoque || piece.qt_estoque;
      piece.valor_peca = data.valor_peca || piece.valor_peca;
      piece.valor_peca_oficina =
        data.valor_peca_oficina || piece.valor_peca_oficina;
      piece.valor_peca_seguradora =
        data.valor_peca_seguradora || piece.valor_peca_seguradora;

      await this.piecesRepository.save(piece);
    }

    return piece;
  }
}
