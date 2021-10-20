import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
  email: string;
  sw_notification: string;
  active: boolean;
}

@injectable()
class ActivateOrDisableNotificationService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    email,
    sw_notification,
    active,
  }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    user.sw_notification = '';

    if (active) {
      user.sw_notification = sw_notification;
    }

    this.usersRepository.save(user);
  }
}

export default ActivateOrDisableNotificationService;
