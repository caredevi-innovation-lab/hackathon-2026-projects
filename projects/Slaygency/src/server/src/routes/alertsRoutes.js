import { Router } from 'express';
import { createAlert, getAlerts, resolveAlert } from '../controllers/alertController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
import { USER_ROLES } from '../models/User.js';

const router = Router();

router.post(
  '/',
  authMiddleware,
  roleMiddleware(USER_ROLES.DOCTOR, USER_ROLES.ADMIN),
  createAlert
);

router.get('/', authMiddleware, roleMiddleware(USER_ROLES.DOCTOR, USER_ROLES.ADMIN), getAlerts);

router.patch(
  '/:id/resolve',
  authMiddleware,
  roleMiddleware(USER_ROLES.DOCTOR, USER_ROLES.ADMIN),
  resolveAlert
);

export default router;

