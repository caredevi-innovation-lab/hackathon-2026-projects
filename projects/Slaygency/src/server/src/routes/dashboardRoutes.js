import { Router } from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
import { USER_ROLES } from '../models/User.js';

const router = Router();

router.get(
  '/stats',
  authMiddleware,
  roleMiddleware(USER_ROLES.DOCTOR, USER_ROLES.ADMIN),
  getDashboardStats
);

export default router;
