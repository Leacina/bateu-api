import { inject, injectable } from 'tsyringe';
import IEstablishmentsRepository from '@modules/establishment/repositories/IEstablishmentsRepository';
import IShopsRepository from '@modules/establishment/repositories/IShopsRepository';
import AppError from '@shared/errors/AppError';
import * as yup from 'yup';
import IPiecesRepository from '@modules/piece/repositories/IPiecesRepository';
import IQuotationsRepository from '../repositories/IQuotationsRepository';
import IQuotationItemsRepository from '../repositories/IQuotationItemsRepository';
import ICreateQuotationItemDTO from '../dtos/ICreateQuotationItemDTO';

interface IRequestItems {
  descricao_peca: string;
  quantidade_solicitada: number;
}

interface IRequestBudget {
  emitente: string;
  emitente_email: string;
  emitente_telefone: string;
  identificador_cotacao: string;
}

// interface IResponse {
//  cotacao: Quotation;
//  itens: QuotationItem[];
// }

@injectable()
export default class CreateQuotationService {
  constructor(
    @inject('QuotationsRepository')
    private quotationsRepository: IQuotationsRepository,

    @inject('QuotationItemsRepository')
    private quotationItemsRepository: IQuotationItemsRepository,

    @inject('PiecesRepository')
    private piecesRepository: IPiecesRepository,

    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,

    @inject('ShopsRepository')
    private shopsRepository: IShopsRepository,
  ) {}

  public async execute(
    user_id: number,
    {
      emitente,
      emitente_email,
      emitente_telefone,
      identificador_cotacao,
    }: IRequestBudget,
    items: IRequestItems[],
  ): Promise<string | undefined> {
    // Validações necessárias para criar o usuário
    const schemaItems = yup.array().of(
      yup.object().shape({
        descricao_peca: yup
          .string()
          .nullable()
          .required('Existem produtos sem descrição'),
        quantidade_solicitada: yup
          .number()
          .required('Existem produtos sem quantidade'),
      }),
    );

    const schema = yup.object().shape({
      emitente: yup.string().nullable().required('Emitente não informado'),
      identificador_cotacao: yup
        .string()
        .nullable()
        .required('Identificador da cotação não informado'),
    });

    // Caso houver algum erro retorna com status 422
    await schemaItems.validate(items).catch(err => {
      throw new AppError(err.message, 422);
    });

    await schema
      .validate({
        emitente,
        emitente_email,
        emitente_telefone,
        identificador_cotacao,
      })
      .catch(err => {
        throw new AppError(err.message, 422);
      });

    const shops = await this.shopsRepository.find({ search: '' });

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < shops.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const quotation = await this.quotationsRepository.create({
        emitente,
        emitente_telefone,
        emitente_email,
        id_estabelecimento: Number(shops[i].id_estabelecimento),
        id_loja: Number(shops[i].id),
        situacao: 'P',
        identificador_cotacao,
      });

      const quotationItems: ICreateQuotationItemDTO[] = [];

      items.map(async item => {
        const { descricao_peca, quantidade_solicitada } = item;

        quotationItems.push({
          descricao_peca,
          quantidade_peca: Number(quantidade_solicitada),
          identificador_cotacao,
          id_cotacao: Number(quotation.id),
          situacao: 'Pendente',
          dh_inc: new Date(),
        });
      });
      // eslint-disable-next-line no-await-in-loop
      await this.quotationItemsRepository.create(quotationItems);
    }

    return 'Cotação criada com sucesso';
  }
}
