import { Router } from 'express';
import { getPatientById, listPatients } from '../controllers/patientsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
import { USER_ROLES } from '../models/User.js';

const router = Router();

router.get('/', authMiddleware, roleMiddleware(USER_ROLES.DOCTOR, USER_ROLES.ADMIN), listPatients);
router.get(
  '/:id',
  authMiddleware,
  roleMiddleware(USER_ROLES.DOCTOR, USER_ROLES.ADMIN),
  getPatientById
);

export default router;
