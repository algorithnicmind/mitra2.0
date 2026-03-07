const express = require('express');
const router = express.Router();

// Controller
const {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  updateAvailability,
} = require('../controllers/authController');

// Middleware
const { protect, roleCheck } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');
const {
  validate,
  registerSchema,
  loginSchema,
  updateProfileSchema,
  changePasswordSchema,
} = require('../middleware/validator');

// ==================== PUBLIC ROUTES ====================

// @route   POST /api/auth/register
router.post('/register', authLimiter, validate(registerSchema), register);

// @route   POST /api/auth/login
router.post('/login', authLimiter, validate(loginSchema), login);

// ==================== PROTECTED ROUTES ====================

// @route   GET /api/auth/me
router.get('/me', protect, getMe);

// @route   PUT /api/auth/profile
router.put('/profile', protect, validate(updateProfileSchema), updateProfile);

// @route   PUT /api/auth/password
router.put('/password', protect, validate(changePasswordSchema), changePassword);

// @route   PUT /api/auth/availability (Counsellor only)
router.put('/availability', protect, roleCheck('counsellor'), updateAvailability);

module.exports = router;
