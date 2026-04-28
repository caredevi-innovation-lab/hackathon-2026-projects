import mongoose from 'mongoose';

const ALERT_SOURCES = ['manual', 'condition'];
const ALERT_PRIORITIES = ['high'];
const ALERT_STATUSES = ['active', 'resolved'];

const alertSchema = new mongoose.Schema(
	{
		patient: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			index: true,
		},
		healthRecord: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'HealthRecord',
			default: null,
			index: true,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		source: {
			type: String,
			enum: ALERT_SOURCES,
			required: true,
			index: true,
		},
		priority: {
			type: String,
			enum: ALERT_PRIORITIES,
			default: 'high',
			index: true,
		},
		status: {
			type: String,
			enum: ALERT_STATUSES,
			default: 'active',
			index: true,
		},
		reasons: {
			type: [String],
			default: [],
		},
		message: {
			type: String,
			required: true,
			trim: true,
			maxlength: 500,
		},
	},
	{
		timestamps: true,
	}
);

alertSchema.index({ patient: 1, status: 1, createdAt: -1 });

export const Alert = mongoose.model('Alert', alertSchema);
