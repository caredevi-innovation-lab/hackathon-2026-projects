import { Router } from 'express';
import {
  deactivateUser,
  getUserById,
  listUsers,
  updateMyProfile,
  updateUserByAdmin,
  updateUserPasswordByAdmin,
} from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

const router = Router();

// Self profile endpoints
router.patch('/profile', authMiddleware, updateMyProfile);

// Admin user-management endpoints
router.get('/admin', authMiddleware, roleMiddleware('Admin'), listUsers);
router.get('/admin/:userId', authMiddleware, roleMiddleware('Admin'), getUserById);
router.patch('/admin/:userId', authMiddleware, roleMiddleware('Admin'), updateUserByAdmin);
router.patch(
  '/admin/:userId/password',
  authMiddleware,
  roleMiddleware('Admin'),
  updateUserPasswordByAdmin
);
router.delete('/admin/:userId', authMiddleware, roleMiddleware('Admin'), deactivateUser);

export default router;
