import { createHttpError } from '../utils/httpError.js';
import { validateRiskInput } from './clinicalValidationService.js';

/** Timeout for AI service requests (ms) */
const REQUEST_TIMEOUT_MS = 10_000;

/**
 * Lazily read AI_SERVICE_URL so it works even when dotenv loads after module init.
 */
function getAiBaseUrl() {
	return (process.env.AI_SERVICE_URL || 'http://localhost:8000').replace(/\/$/, '');
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function toNumber(value, fallback) {
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : fallback;
}

function hasSymptom(symptoms, options) {
	if (!Array.isArray(symptoms)) {
		return 0;
	}

	const normalized = symptoms.map((item) => String(item).trim().toLowerCase());
	return options.some((option) => normalized.includes(option)) ? 1 : 0;
}

function toBinary(value, fallback = 0) {
	const normalized = Number(value);
	if (normalized === 1) {
		return 1;
	}

	if (normalized === 0) {
		return 0;
	}

	return fallback;
}

// ── Payload Mapping ──────────────────────────────────────────────────────────

function mapToAiPayload(payload) {
	const symptoms = Array.isArray(payload.symptoms) ? payload.symptoms : [];

	return {
		age: toNumber(payload.age, 25),
		systolic_bp: toNumber(payload.systolicBP ?? payload.bpSystolic, 120),
		diastolic_bp: toNumber(payload.diastolicBP ?? payload.bpDiastolic, 80),
		hemoglobin: toNumber(payload.hemoglobin, 11.5),
		blood_glucose: toNumber(payload.bloodGlucose ?? payload.blood_glucose, 90),
		body_temp: toNumber(payload.bodyTemp ?? payload.body_temp, 98.4),
		heart_rate: toNumber(payload.heartRate ?? payload.heart_rate, 80),
		gestational_age: toNumber(payload.gestationalAge ?? payload.gestational_age, 20),
		prev_pregnancies: toNumber(payload.prevPregnancies ?? payload.prev_pregnancies, 0),
		prev_complications: toBinary(
			payload.prevComplications ?? payload.prev_complications ?? payload.priorHypertension,
			0
		),
		headache: hasSymptom(symptoms, ['headache', 'severe headache']) || toBinary(payload.headache),
		swelling: hasSymptom(symptoms, ['swelling', 'edema']) || toBinary(payload.swelling),
		blurred_vision:
			hasSymptom(symptoms, ['blurred vision', 'blurred_vision']) ||
			toBinary(payload.blurredVision ?? payload.blurred_vision),
		abdominal_pain:
			hasSymptom(symptoms, ['abdominal pain', 'abdominal_pain']) ||
			toBinary(payload.abdominalPain ?? payload.abdominal_pain),
		fatigue: hasSymptom(symptoms, ['fatigue']) || toBinary(payload.fatigue),
		nausea: hasSymptom(symptoms, ['nausea']) || toBinary(payload.nausea),
		bleeding: hasSymptom(symptoms, ['bleeding']) || toBinary(payload.bleeding),
		rural: toBinary(payload.rural),
	};
}

// ── HTTP Client ──────────────────────────────────────────────────────────────

async function requestJson(path, options = {}) {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

	try {
		const response = await fetch(`${getAiBaseUrl()}${path}`, {
			...options,
			signal: controller.signal,
			headers: {
				'Content-Type': 'application/json',
				...(options.headers || {}),
			},
		});

		const data = await response.json().catch(() => ({}));
		if (!response.ok) {
			throw createHttpError(
				data.detail || data.message || `AI service request failed (${response.status})`,
				response.status
			);
		}

		return data;
	} catch (error) {
		if (error.name === 'AbortError') {
			throw createHttpError('AI service timeout', 504);
		}

		if (typeof error.status !== 'number') {
			throw createHttpError('AI service unavailable', 502);
		}

		throw error;
	} finally {
		clearTimeout(timeout);
	}
}

// ── AI Response Validation & Normalization ───────────────────────────────────

/**
 * Normalize the raw AI response so every consumer gets a consistent shape:
 *   { riskLevel, riskScore, explanation, source, raw }
 */
function normalizeAiResponse(raw) {
	const riskLevel = String(raw.risk_level || raw.riskLevel || 'Unknown');
	const riskScore = Number(raw.risk_score ?? raw.riskScore ?? raw.probability ?? 0);
	const explanation =
		raw.explanation ||
		(Array.isArray(raw.contributing_factors)
			? raw.contributing_factors.join('; ')
			: raw.message || 'No explanation available');

	// Validate that the response has meaningful data
	const validLevels = ['Low', 'Moderate', 'High', 'low', 'moderate', 'high'];
	const normalizedLevel = validLevels.includes(riskLevel)
		? riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1).toLowerCase()
		: 'Unknown';

	return {
		riskLevel: normalizedLevel,
		riskScore: Number.isFinite(riskScore) ? Math.round(riskScore * 100) / 100 : 0,
		explanation,
		source: 'ai',
		raw,
	};
}

/**
 * Validate that the normalized AI response has the required fields.
 */
function isValidAiResponse(normalized) {
	return (
		normalized &&
		typeof normalized.riskLevel === 'string' &&
		normalized.riskLevel !== 'Unknown' &&
		typeof normalized.riskScore === 'number' &&
		Number.isFinite(normalized.riskScore)
	);
}

// ── Local Fallback (Rule-Based Heuristic) ────────────────────────────────────

/**
 * When the AI service is unavailable, compute a basic rule-based risk
 * assessment focused on preeclampsia indicators.
 */
function localFallbackPrediction(payload) {
	const systolic = toNumber(payload.systolicBP ?? payload.bpSystolic, 120);
	const diastolic = toNumber(payload.diastolicBP ?? payload.bpDiastolic, 80);
	const hb = toNumber(payload.hemoglobin, 12);
	const symptoms = Array.isArray(payload.symptoms) ? payload.symptoms : [];

	const normalizedSymptoms = symptoms.map((s) => String(s).trim().toLowerCase());
	const criticalSymptoms = ['severe headache', 'blurred vision', 'swelling', 'seizure', 'convulsion'];
	const hasCritical = normalizedSymptoms.some((s) => criticalSymptoms.includes(s));

	const reasons = [];
	let score = 0;

	// Blood pressure evaluation (primary preeclampsia indicator)
	if (systolic >= 160 || diastolic >= 110) {
		score += 40;
		reasons.push(`Severely elevated BP (${systolic}/${diastolic} mmHg)`);
	} else if (systolic >= 140 || diastolic >= 90) {
		score += 25;
		reasons.push(`Elevated BP (${systolic}/${diastolic} mmHg)`);
	}

	// Hemoglobin evaluation
	if (hb < 7) {
		score += 25;
		reasons.push(`Severe anemia (Hb: ${hb} g/dL)`);
	} else if (hb < 10) {
		score += 15;
		reasons.push(`Low hemoglobin (Hb: ${hb} g/dL)`);
	}

	// Critical symptoms
	if (hasCritical) {
		score += 20;
		reasons.push('Critical maternal symptoms detected');
	}

	// Symptom count
	score += Math.min(10, normalizedSymptoms.length * 3);

	// Determine risk level
	let riskLevel;
	if (score >= 50) {
		riskLevel = 'High';
	} else if (score >= 25) {
		riskLevel = 'Moderate';
	} else {
		riskLevel = 'Low';
	}

	return {
		riskLevel,
		riskScore: Math.min(100, score),
		explanation: reasons.length > 0
			? reasons.join('; ')
			: 'All vitals within normal range based on rule-based assessment',
		source: 'fallback',
		raw: null,
	};
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Call the external AI service for maternal risk prediction.
 * Falls back to local heuristic if AI is unreachable.
 * Always returns: { riskLevel, riskScore, explanation, source }
 */
export async function predictMaternalRisk(payload) {
	const aiPayload = mapToAiPayload(payload);

	try {
		const raw = await requestJson('/predict', {
			method: 'POST',
			body: JSON.stringify(aiPayload),
		});

		const normalized = normalizeAiResponse(raw);

		if (isValidAiResponse(normalized)) {
			return normalized;
		}

		// AI returned invalid/incomplete data — fall back to heuristic
		// eslint-disable-next-line no-console
		console.warn('[riskService] AI response invalid, using fallback. Raw:', raw);
		return localFallbackPrediction(payload);
	} catch (error) {
		// AI service down — fall back to local heuristic
		// eslint-disable-next-line no-console
		console.warn('[riskService] AI service error, using local fallback:', error.message);
		return localFallbackPrediction(payload);
	}
}

export async function getAiServiceHealth() {
	try {
		const data = await requestJson('/health', { method: 'GET' });
		return { status: 'connected', ...data };
	} catch (error) {
		return {
			status: 'unavailable',
			message: error.message,
			fallbackActive: true,
		};
	}
}

export async function predictRiskForPayload(payload) {
	if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
		throw createHttpError('Invalid payload', 400);
	}

	const error = validateRiskInput(payload);
	if (error) {
		throw createHttpError(error, 400);
	}

	return predictMaternalRisk(payload);
}

export async function getRiskServiceHealth() {
	return getAiServiceHealth();
}
