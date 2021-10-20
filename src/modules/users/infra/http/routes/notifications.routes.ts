import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import NotificationBudgetController from '../controllers/notification/NotificationBudgetController';
import NotificationQuotationController from '../controllers/notification/NotificationQuotationController';
import NotificationController from '../controllers/notification/NotificationController';
import NotificationUserViewedController from '../controllers/notification/NotificationUserViewedController';
import ActivateOrDisableNotificationController from '../controllers/notification/ActivateOrDisableNotificationController';

const notificationsRoutes = Router();

const notificationBudgetController = new NotificationBudgetController();
const notificationQuotationController = new NotificationQuotationController();
const notificationController = new NotificationController();
const notificationUserViewedController = new NotificationUserViewedController();
const activateOrDisableNotificationController = new ActivateOrDisableNotificationController();

notificationsRoutes.use(ensureAuthenticated);

notificationsRoutes.post('/', notificationController.create);

notificationsRoutes.post(
  '/serviceworker',
  activateOrDisableNotificationController.create,
);

notificationsRoutes.get('/', notificationController.show);
notificationsRoutes.get('/:id', notificationController.index);
notificationsRoutes.post(
  '/visualizado/:id',
  notificationUserViewedController.create,
);
notificationsRoutes.get('/budget/:id', notificationBudgetController.delete);
notificationsRoutes.get(
  '/quotation/:id',
  notificationQuotationController.delete,
);

export default notificationsRoutes;
