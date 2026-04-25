import mongoose from 'mongoose';

const healthRecordSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			index: true,
		},
		age: {
			type: Number,
			required: true,
			min: 1,
			max: 70,
		},
		systolicBP: {
			type: Number,
			required: true,
			min: 70,
			max: 260,
		},
		diastolicBP: {
			type: Number,
			required: true,
			min: 40,
			max: 160,
		},
		hemoglobin: {
			type: Number,
			required: true,
			min: 0.1,
			max: 25,
		},
		symptoms: {
			type: [String],
			default: [],
		},
		pregnancyHistory: {
			type: mongoose.Schema.Types.Mixed,
			default: '',
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		versionKey: false,
	}
);

healthRecordSchema.index({ user: 1, createdAt: -1 });

export const HealthRecord = mongoose.model('HealthRecord', healthRecordSchema);
