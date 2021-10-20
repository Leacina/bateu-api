import { Request, Response } from 'express';
import ActivateOrDisableNotificationService from '@modules/users/services/ActivateOrDisableNotificationService';
import { container } from 'tsyringe';

export default class ActivateOrDisableNotificationController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, active, sw_notification } = request.body;

    const activateOrDisableNotificationService = container.resolve(
      ActivateOrDisableNotificationService,
    );

    await activateOrDisableNotificationService.execute({
      active,
      email,
      sw_notification,
    });

    return response.json({ OK: true });
  }
}
