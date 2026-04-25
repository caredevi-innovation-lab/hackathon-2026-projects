import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import mongoose from 'mongoose';

export const USER_ROLES = Object.freeze({
	PATIENT: 'Patient',
	DOCTOR: 'Doctor',
	ADMIN: 'Admin',
});

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			minlength: 2,
			maxlength: 120,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			index: true,
		},
		passwordHash: {
			type: String,
			required: true,
			select: false,
		},
		role: {
			type: String,
			enum: Object.values(USER_ROLES),
			default: USER_ROLES.PATIENT,
			index: true,
		},
		phone: {
			type: String,
			trim: true,
			default: '',
		},
		isActive: {
			type: Boolean,
			default: true,
			index: true,
		},
		resetPasswordTokenHash: {
			type: String,
			select: false,
		},
		resetPasswordExpiresAt: {
			type: Date,
			select: false,
		},
		lastLoginAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.index({ role: 1, isActive: 1 });

userSchema.methods.comparePassword = async function comparePassword(plainPassword) {
	return bcrypt.compare(plainPassword, this.passwordHash);
};

userSchema.methods.createPasswordResetToken = function createPasswordResetToken() {
	const rawToken = crypto.randomBytes(32).toString('hex');
	const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

	this.resetPasswordTokenHash = tokenHash;
	this.resetPasswordExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

	return rawToken;
};

userSchema.methods.toPublicJSON = function toPublicJSON() {
	return {
		id: this._id,
		name: this.name,
		email: this.email,
		role: this.role,
		phone: this.phone,
		isActive: this.isActive,
		createdAt: this.createdAt,
		updatedAt: this.updatedAt,
		lastLoginAt: this.lastLoginAt,
	};
};

export const User = mongoose.model('User', userSchema);
