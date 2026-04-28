import { Router } from 'express';
import {
  changeMyPassword,
  forgotPassword,
  getMe,
  login,
  register,
  resetPassword,
} from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  validateForgotPasswordPayload,
  validateLoginPayload,
  validatePasswordChangePayload,
  validateRegisterPayload,
  validateResetPasswordPayload,
} from '../middleware/validateMiddleware.js';

const router = Router();

// Public authentication endpoints
router.post('/register', validateRegisterPayload, register);
router.post('/login', validateLoginPayload, login);
router.post('/password/forgot', validateForgotPasswordPayload, forgotPassword);
router.post('/password/reset', validateResetPasswordPayload, resetPassword);

// Authenticated account endpoints
router.get('/me', authMiddleware, getMe);
router.post('/password/change', authMiddleware, validatePasswordChangePayload, changeMyPassword);

export default router;
