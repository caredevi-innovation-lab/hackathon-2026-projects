import { getRiskServiceHealth, predictRiskForPayload } from '../services/riskService.js';

export async function predictRisk(req, res, next) {
  try {
    const prediction = await predictRiskForPayload(req.body);
    return res.json({
      success: true,
      prediction,
    });
  } catch (error) {
    return next(error);
  }
}

export async function getRiskHealth(req, res, next) {
  try {
    const health = await getRiskServiceHealth();
    return res.json({
      success: true,
      aiService: health,
    });
  } catch (error) {
    return next(error);
  }
}
