import { Router } from 'express';
import { getRiskHealth, predictRisk } from '../controllers/riskController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRiskPayload } from '../middleware/validateMiddleware.js';

const router = Router();

router.get('/health', authMiddleware, getRiskHealth);
router.post('/predict', authMiddleware, validateRiskPayload, predictRisk);

export default router;
