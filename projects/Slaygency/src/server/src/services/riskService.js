import { validateRiskInput } from './clinicalValidationService.js';

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';
const REQUEST_TIMEOUT_MS = 10000;
const SAFE_AI_SERVICE_URL = AI_SERVICE_URL.replace(/\/$/, '');

function createHttpError(message, status) {
	const error = new Error(message);
	error.status = status;
	return error;
}

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

async function requestJson(path, options = {}) {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

	try {
		const response = await fetch(`${SAFE_AI_SERVICE_URL}${path}`, {
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

export async function predictMaternalRisk(payload) {
	const aiPayload = mapToAiPayload(payload);
	return requestJson('/predict', {
		method: 'POST',
		body: JSON.stringify(aiPayload),
	});
}

export async function getAiServiceHealth() {
	return requestJson('/health', { method: 'GET' });
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
