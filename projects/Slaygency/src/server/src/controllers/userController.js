import bcrypt from 'bcryptjs';
import { USER_ROLES, User } from '../models/User.js';

export async function listUsers(req, res, next) {
  try {
    const {
      role,
      isActive,
      search,
      page = 1,
      limit = 20,
      sort = '-createdAt',
    } = req.query;

    const query = {};

    if (role && Object.values(USER_ROLES).includes(role)) {
      query.role = role;
    }

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const safeLimit = Math.min(Number(limit) || 20, 100);
    const safePage = Math.max(Number(page) || 1, 1);
    const skip = (safePage - 1) * safeLimit;

    const [items, total] = await Promise.all([
      User.find(query).sort(sort).skip(skip).limit(safeLimit),
      User.countDocuments(query),
    ]);

    return res.json({
      items: items.map((u) => u.toPublicJSON()),
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit) || 1,
    });
  } catch (error) {
    return next(error);
  }
}

export async function getUserById(req, res, next) {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ user: user.toPublicJSON() });
  } catch (error) {
    return next(error);
  }
}

export async function updateMyProfile(req, res, next) {
  try {
    const { name, phone } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          ...(name !== undefined ? { name } : {}),
          ...(phone !== undefined ? { phone } : {}),
        },
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ user: user.toPublicJSON() });
  } catch (error) {
    return next(error);
  }
}

export async function updateUserByAdmin(req, res, next) {
  try {
    const { name, phone, role, isActive } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          ...(name !== undefined ? { name } : {}),
          ...(phone !== undefined ? { phone } : {}),
          ...(role !== undefined ? { role } : {}),
          ...(isActive !== undefined ? { isActive } : {}),
        },
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ user: user.toPublicJSON() });
  } catch (error) {
    return next(error);
  }
}

export async function updateUserPasswordByAdmin(req, res, next) {
  try {
    const { newPassword } = req.body;
    const user = await User.findById(req.params.userId).select('+passwordHash');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.json({ message: 'User password updated successfully' });
  } catch (error) {
    return next(error);
  }
}

export async function deactivateUser(req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: { isActive: false } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ message: 'User deactivated', user: user.toPublicJSON() });
  } catch (error) {
    return next(error);
  }
}
