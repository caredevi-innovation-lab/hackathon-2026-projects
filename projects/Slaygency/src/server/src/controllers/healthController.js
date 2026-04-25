import { HealthRecord } from '../models/HealthRecord.js';
import { createConditionAlertFromRecord } from './alertController.js';

function isRealisticBP(systolicBP, diastolicBP) {
	if (systolicBP <= diastolicBP) return false;
	if (systolicBP < 70 || systolicBP > 260) return false;
	if (diastolicBP < 40 || diastolicBP > 160) return false;
	return true;
}

function validateHealthInput(payload) {
	const { age, systolicBP, diastolicBP, hemoglobin, symptoms } = payload;

	if (!Number.isFinite(Number(age)) || Number(age) <= 0) {
		return 'Age must be greater than 0';
	}

	if (!isRealisticBP(Number(systolicBP), Number(diastolicBP))) {
		return 'Blood pressure values are not realistic';
	}

	if (!Number.isFinite(Number(hemoglobin)) || Number(hemoglobin) <= 0) {
		return 'Hemoglobin must be greater than 0';
	}

	if (symptoms !== undefined && !Array.isArray(symptoms)) {
		return 'Symptoms must be an array of strings';
	}

	return null;
}

export async function addHealthRecord(req, res, next) {
	try {
		const validationError = validateHealthInput(req.body);
		if (validationError) {
			return res.status(400).json({ message: validationError });
		}

		const record = await HealthRecord.create({
			user: req.user.id,
			age: Number(req.body.age),
			systolicBP: Number(req.body.systolicBP),
			diastolicBP: Number(req.body.diastolicBP),
			hemoglobin: Number(req.body.hemoglobin),
			symptoms: Array.isArray(req.body.symptoms) ? req.body.symptoms : [],
			pregnancyHistory:
				req.body.pregnancyHistory !== undefined ? req.body.pregnancyHistory : '',
		});

		await createConditionAlertFromRecord({
			healthRecord: record,
			actorId: req.user.id,
		});

		return res.status(201).json(record);
	} catch (error) {
		return next(error);
	}
}

export async function getHealthRecords(req, res, next) {
	try {
		const records = await HealthRecord.find({ user: req.user.id }).sort({ createdAt: -1 });
		return res.json(records);
	} catch (error) {
		return next(error);
	}
}

export async function updateHealthRecord(req, res, next) {
	try {
		const record = await HealthRecord.findById(req.params.id);
		if (!record) {
			return res.status(404).json({ message: 'Health record not found' });
		}

		if (record.user.toString() !== req.user.id) {
			return res.status(403).json({ message: 'Forbidden' });
		}

		const mergedPayload = {
			age: req.body.age ?? record.age,
			systolicBP: req.body.systolicBP ?? record.systolicBP,
			diastolicBP: req.body.diastolicBP ?? record.diastolicBP,
			hemoglobin: req.body.hemoglobin ?? record.hemoglobin,
			symptoms: req.body.symptoms ?? record.symptoms,
			pregnancyHistory: req.body.pregnancyHistory ?? record.pregnancyHistory,
		};

		const validationError = validateHealthInput(mergedPayload);
		if (validationError) {
			return res.status(400).json({ message: validationError });
		}

		record.age = Number(mergedPayload.age);
		record.systolicBP = Number(mergedPayload.systolicBP);
		record.diastolicBP = Number(mergedPayload.diastolicBP);
		record.hemoglobin = Number(mergedPayload.hemoglobin);
		record.symptoms = Array.isArray(mergedPayload.symptoms) ? mergedPayload.symptoms : [];
		record.pregnancyHistory = mergedPayload.pregnancyHistory;

		await record.save();

		await createConditionAlertFromRecord({
			healthRecord: record,
			actorId: req.user.id,
		});

		return res.json(record);
	} catch (error) {
		return next(error);
	}
}
