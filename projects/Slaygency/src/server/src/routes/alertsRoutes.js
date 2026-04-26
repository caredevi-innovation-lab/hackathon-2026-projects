import { Router } from 'express';
import { createAlert, getAlerts } from '../controllers/alertController.js';
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

export default router;
