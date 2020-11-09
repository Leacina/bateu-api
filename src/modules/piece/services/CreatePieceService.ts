import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import * as yup from 'yup';
import IShopsRepository from '@modules/establishment/repositories/IShopsRepository';
import IEstablishmentsRepository from '@modules/establishment/repositories/IEstablishmentsRepository';
import IBrandsRepository from '../repositories/IBrandsRepository';
import IModelsRepository from '../repositories/IModelsRepository';
import IPiecesRepository from '../repositories/IPiecesRepository';
import Piece from '../infra/typeorm/entities/Piece';

interface IRequest {
  id_estabelecimento: number;
  id_loja: number;
  id_marca: number;
  id_modelo: number;
  id_categoria: number;
  nm_peca: string;
  valor_peca: number;
  valor_peca_oficina: number;
  valor_peca_seguradora: number;
  qt_disponivel: number;
  qt_estoque: number;
  ano_inicial: number;
  codigo_peca: string;
  is_promocional: string;
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
export default class CreateModelService {
  constructor(
    @inject('PiecesRepository') private piecesRepository: IPiecesRepository,

    @inject('ModelsRepository') private modelsRepository: IModelsRepository,

    @inject('BrandsRepository') private brandsRepository: IBrandsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ShopsRepository')
    private shopsRepository: IShopsRepository,

    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ) {}

  public async execute(data: IRequest): Promise<Piece | undefined> {
    // Validações necessárias para criar o usuário
    const schema = yup.object().shape({
      id_estabelecimento: yup
        .number()
        .required('Estabelecimento não informado'),
      id_loja: yup.number().required('Loja não informada'),
      id_marca: yup.number().required('Marca não informada'),
      id_modelo: yup.number().required('Modelo não informado'),
      id_categoria: yup.number().required('Categoriia não informada'),
      nm_peca: yup.string().required('Nome da peça não informada'),
      valor_peca: yup.number().required('Valor da peça não informado'),
      valor_peca_oficina: yup
        .number()
        .required('Valor da peça na oficina não informado'),
      valor_peca_seguradora: yup
        .number()
        .required('Valor da peça na seguradora não informado'),
      qt_disponivel: yup
        .number()
        .required('Quantidade disponível não informado'),
      qt_estoque: yup.number().required('Quantidade em estoquee não informado'),
      ano_inicial: yup.string().required('Ano inicial não informado'),
      codigo_peca: yup.string().required('Código da peça não informado'),
      is_promocional: yup.string().default(() => {
        return 'Não';
      }),
    });

    // Caso houver algum erro retorna com status 422
    await schema.validate(data).catch(err => {
      throw new AppError(err.message, 422);
    });

    const user = await this.usersRepository.findById(data.user_id);

    const brand = await this.brandsRepository.findByID(
      data.id_marca,
      user.id_conta,
    );
    if (!brand) {
      throw new AppError('Marca não encontrada');
    }

    const model = await this.modelsRepository.findByID(
      data.id_modelo,
      user.id_conta,
    );
    if (!model) {
      throw new AppError('Modelo não encontrado');
    }

    // Verifica se o estabelecimento esta correto
    if (data.id_estabelecimento) {
      const establishment = await this.establishmentsRepository.findById(
        data.id_estabelecimento,
      );
      // Verifica se o estabelecimento existe
      if (!establishment) {
        throw new AppError('Estabelecimento informado inválido');
      }
      // Verifica se tem permissão
      if (establishment.id_conta !== user.id_conta) {
        throw new AppError(
          'Você não tem permissão para criar com este estabelecimento',
          403,
        );
      }
    }

    // Verifica se a loja esta correto
    if (data.id_loja) {
      const shop = await this.shopsRepository.findById(data.id_loja);
      if (!shop) {
        throw new AppError('Loja informada inválida');
      }
      // Verifica se tem permissão
      if (shop.id_conta !== user.id_conta) {
        throw new AppError(
          'Você não tem permissão para criar com esta loja',
          403,
        );
      }
    }

    const piece = await this.piecesRepository.create({
      id_conta: user.id_conta,
      ...data,
    });

    return piece;
  }
}
