const User = require('../models/User');
const { asyncHandler, AppError, generateAnonymousAlias } = require('../utils/helpers');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role, universityId, universityName, department, yearOfStudy } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      success: false,
      error: { code: 'CONFLICT', message: 'A user with this email already exists' },
    });
  }

  // Generate anonymous alias
  const anonymousAlias = generateAnonymousAlias();

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role: role || 'student',
    universityId,
    universityName,
    department: department || '',
    yearOfStudy,
    anonymousAlias,
  });

  // Generate token
  const token = user.generateToken();

  res.status(201).json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      universityName: user.universityName,
      anonymousAlias: user.anonymousAlias,
    },
  });
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user and include password field
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Invalid email or password' },
    });
  }

  // Check if account is active
  if (!user.isActive) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Account is deactivated' },
    });
  }

  // Check password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Invalid email or password' },
    });
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  // Generate token
  const token = user.generateToken();

  res.json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      universityName: user.universityName,
      anonymousAlias: user.anonymousAlias,
      preferences: user.preferences,
    },
  });
});

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json({
    success: true,
    user,
  });
});

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
const updateProfile = asyncHandler(async (req, res) => {
  const allowedFields = ['name', 'department', 'yearOfStudy', 'preferences', 'bio', 'profilePicture'];
  const updates = {};

  // Only allow specified fields
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  });

  res.json({
    success: true,
    user,
  });
});

/**
 * @desc    Change password
 * @route   PUT /api/auth/password
 * @access  Private
 */
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // Get user with password
  const user = await User.findById(req.user._id).select('+password');

  // Check current password
  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      error: { code: 'BAD_REQUEST', message: 'Current password is incorrect' },
    });
  }

  // Update password
  user.password = newPassword;
  await user.save();

  // Generate new token
  const token = user.generateToken();

  res.json({
    success: true,
    token,
    message: 'Password updated successfully',
  });
});

/**
 * @desc    Update counsellor availability (counsellor only)
 * @route   PUT /api/auth/availability
 * @access  Private (Counsellor)
 */
const updateAvailability = asyncHandler(async (req, res) => {
  const { availability, specialization } = req.body;

  const updates = {};
  if (availability) updates.availability = availability;
  if (specialization) updates.specialization = specialization;

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  });

  res.json({
    success: true,
    user,
  });
});

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  updateAvailability,
};
