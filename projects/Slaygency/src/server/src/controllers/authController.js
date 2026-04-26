import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { USER_ROLES, User } from '../models/User.js';

function signAccessToken(user) {
	return jwt.sign(
		{
			sub: user._id.toString(),
			role: user.role,
			email: user.email,
			name: user.name,
		},
		process.env.JWT_SECRET || 'dev-secret',
		{ expiresIn: '7d' }
	);
}

function authPayload(user) {
	const token = signAccessToken(user);
	return {
		token,
		accessToken: token,
		user: user.toPublicJSON(),
	};
}

export async function register(req, res, next) {
	try {
		const { name, email, password, role = USER_ROLES.PATIENT, phone = '' } = req.body;

		const existing = await User.findOne({ email: String(email).toLowerCase() });
		if (existing) {
			return res.status(409).json({ message: 'Email already in use' });
		}

		const passwordHash = await bcrypt.hash(password, 10);
		const user = await User.create({
			name,
			email,
			passwordHash,
			role,
			phone,
		});

		return res.status(201).json(authPayload(user));
	} catch (error) {
		return next(error);
	}
}

export async function login(req, res, next) {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email: String(email).toLowerCase() }).select('+passwordHash');
		if (!user || !user.isActive) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		user.lastLoginAt = new Date();
		await user.save();

		return res.json(authPayload(user));
	} catch (error) {
		return next(error);
	}
}

export async function forgotPassword(req, res, next) {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email: String(email).toLowerCase() }).select(
			'+resetPasswordTokenHash +resetPasswordExpiresAt'
		);

		if (user) {
			const resetToken = user.createPasswordResetToken();
			await user.save();

			// For hackathon demo use case, return token directly.
			return res.json({
				message: 'Password reset token generated',
				resetToken,
				expiresInMinutes: 15,
			});
		}

		return res.json({ message: 'If this email exists, a reset token has been generated' });
	} catch (error) {
		return next(error);
	}
}

export async function resetPassword(req, res, next) {
	try {
		const { token, newPassword } = req.body;
		const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

		const user = await User.findOne({
			resetPasswordTokenHash: tokenHash,
			resetPasswordExpiresAt: { $gt: new Date() },
		}).select('+resetPasswordTokenHash +resetPasswordExpiresAt +passwordHash');

		if (!user) {
			return res.status(400).json({ message: 'Invalid or expired reset token' });
		}

		user.passwordHash = await bcrypt.hash(newPassword, 10);
		user.resetPasswordTokenHash = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		return res.json({ message: 'Password reset successful' });
	} catch (error) {
		return next(error);
	}
}

export async function getMe(req, res, next) {
	try {
		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		return res.json({ user: user.toPublicJSON() });
	} catch (error) {
		return next(error);
	}
}

export async function changeMyPassword(req, res, next) {
	try {
		const { currentPassword, newPassword } = req.body;
		const user = await User.findById(req.user.id).select('+passwordHash');

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const ok = await user.comparePassword(currentPassword);
		if (!ok) {
			return res.status(400).json({ message: 'Current password is incorrect' });
		}

		user.passwordHash = await bcrypt.hash(newPassword, 10);
		await user.save();

		return res.json({ message: 'Password updated successfully' });
	} catch (error) {
		return next(error);
	}
}
