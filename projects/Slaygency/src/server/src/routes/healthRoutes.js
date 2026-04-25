import { Router } from 'express';
import {
  addHealthRecord,
  getHealthRecords,
  updateHealthRecord,
} from '../controllers/healthController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', authMiddleware, addHealthRecord);
router.get('/', authMiddleware, getHealthRecords);
router.put('/:id', authMiddleware, updateHealthRecord);

export default router;
