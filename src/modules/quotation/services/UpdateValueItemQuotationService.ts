import { inject, injectable } from 'tsyringe';
import ioClient from 'socket.io-client';
import INotificationsRepository from '@modules/users/repositories/INotificationsRepository';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import path from 'path';
import NotificationServiceWorker from '@shared/utils/implementations/NotificationServiceWorker';
import IQuotationItemsRepository from '../repositories/IQuotationItemsRepository';
import QuotationItem from '../infra/typeorm/entities/QuotationItem';
import IQuotationsRepository from '../repositories/IQuotationsRepository';

const ioClientConnect = ioClient('https://bateuweb.com.br/', {
  transports: ['websocket'],
  upgrade: false,
});

interface IRequest {
  id: number;
  value: number;
  condition: string;
  observation: string;
}

@injectable()
export default class UpdateValueItemQuotationProcessService {
  constructor(
    @inject('QuotationItemsRepository')
    private quotationItemsRepository: IQuotationItemsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('QuotationsRepository')
    private quotationsRepository: IQuotationsRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({
    id,
    value,
    condition,
    observation,
  }: IRequest): Promise<QuotationItem> {
    const budgetItem = await this.quotationItemsRepository.updateValue({
      id,
      value,
      condition,
      observation,
    });

    // Verifica se a cotação foi finalizada
    const quotation = await this.quotationsRepository.findById(
      Number(budgetItem.id_cotacao),
    );

    // Busca o usuário para saber qual o id para notificar
    const usuario = await this.usersRepository.findByEmail(
      quotation.emitente_email,
    );

    const notificationServiceWorker = new NotificationServiceWorker();

    if (usuario.sw_notification) {
      // ServiceWorker
      notificationServiceWorker.sendNotification(
        usuario.sw_notification,
        `O item ${budgetItem.descricao_peca} da sua cotação ${quotation.identificador_cotacao} teve uma alteração pela loja ${quotation.loja.nm_loja}.`,
        '',
      );
    }

    const notification = await this.notificationsRepository.create({
      id_cotacao: Number(quotation.id),
      id_usuario: Number(usuario.id),
      id_loja: 0,
      mensagem: `O item ${budgetItem.descricao_peca} da sua cotação ${quotation.identificador_cotacao} teve uma alteração pela loja ${quotation.loja.nm_loja}.`,
    });

    ioClientConnect.emit('send notify', {
      room: `id_usuario${usuario.id}`,
      data: notification,
    });

    const createQuotationTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'quotation_create.hbs',
    );

    // eslint-disable-next-line no-await-in-loop
    this.mailProvider
      .sendMail({
        to: {
          name: quotation.emitente,
          email: quotation.emitente_email,
        },
        subject: '[BATEU] Cotação alterada',
        templateData: {
          file: createQuotationTemplate,
          variable: {
            title: 'Cotação alterada!',
            text_info: `O item ${budgetItem.descricao_peca} da sua cotação ${quotation.identificador_cotacao} teve uma alteração pela loja ${quotation.loja.nm_loja}. Para mais detalhes, acesse o Bateu.`,
          },
        },
      })
      .catch(error => {
        console.log(error);
      });

    return budgetItem;
  }
}
