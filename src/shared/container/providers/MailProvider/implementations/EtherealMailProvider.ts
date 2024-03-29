import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      pool: true,
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'equipebateu@gmail.com',
        pass: 'S3NHAequipebateu',
      },
    });

    // nodemailer.createTestAccount().then(account => {
    //   this.client = nodemailer.createTransport({
    //     host: account.smtp.host,
    //     port: account.smtp.port,
    //     secure: account.smtp.secure,
    //     auth: {
    //       user: account.user,
    //       pass: account.pass,
    //     },
    //   });
    // });
  }

  public async sendMail({
    from,
    subject,
    to,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from ? from.name : 'Equipe Bateu',
        address: from ? from.email : 'no-reply@bateu.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
