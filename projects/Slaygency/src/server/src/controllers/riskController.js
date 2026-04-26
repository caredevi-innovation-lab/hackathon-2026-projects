import { getAiServiceHealth, predictMaternalRisk } from '../services/riskService.js';

export async function predictRisk(req, res, next) {
	try {
		if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
			return res.status(400).json({ message: 'Invalid payload' });
		}

		const prediction = await predictMaternalRisk(req.body);
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
		const health = await getAiServiceHealth();
		return res.json({
			success: true,
			aiService: health,
		});
	} catch (error) {
		return next(error);
	}
}
