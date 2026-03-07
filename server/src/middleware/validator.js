const Joi = require('joi');

/**
 * Validation middleware factory
 * Usage: validate(registerSchema)
 */
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const messages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: messages[0],
          details: messages,
        },
      });
    }

    next();
  };
};

// ============== Auth Schemas ==============

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name must be at most 100 characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).max(128).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'any.required': 'Password is required',
  }),
  role: Joi.string()
    .valid('student', 'counsellor', 'admin', 'volunteer')
    .default('student'),
  universityId: Joi.string().required().messages({
    'any.required': 'University ID is required',
  }),
  universityName: Joi.string().required().messages({
    'any.required': 'University name is required',
  }),
  department: Joi.string().optional().allow(''),
  yearOfStudy: Joi.number().min(1).max(6).optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
  }),
});

const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  department: Joi.string().optional().allow(''),
  yearOfStudy: Joi.number().min(1).max(6).optional(),
  preferences: Joi.object({
    language: Joi.string().valid('en', 'hi', 'od').optional(),
    notifications: Joi.object({
      email: Joi.boolean().optional(),
      push: Joi.boolean().optional(),
    }).optional(),
    theme: Joi.string().valid('light', 'dark').optional(),
  }).optional(),
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    'any.required': 'Current password is required',
  }),
  newPassword: Joi.string().min(6).max(128).required().messages({
    'string.min': 'New password must be at least 6 characters',
    'any.required': 'New password is required',
  }),
});

// ============== Chat Schemas ==============

const chatMessageSchema = Joi.object({
  message: Joi.string().min(1).max(2000).required().messages({
    'string.min': 'Message cannot be empty',
    'string.max': 'Message is too long (max 2000 characters)',
    'any.required': 'Message is required',
  }),
  sessionId: Joi.string().optional(),
});

// ============== Screening Schemas ==============

const screeningSubmitSchema = Joi.object({
  type: Joi.string().valid('PHQ9', 'GAD7', 'GHQ12').required().messages({
    'any.only': 'Type must be PHQ9, GAD7, or GHQ12',
    'any.required': 'Assessment type is required',
  }),
  answers: Joi.array()
    .items(
      Joi.object({
        questionNumber: Joi.number().required(),
        selectedOption: Joi.number().min(0).max(3).required(),
      })
    )
    .min(1)
    .required()
    .messages({
      'array.min': 'At least one answer is required',
      'any.required': 'Answers are required',
    }),
  isAnonymous: Joi.boolean().default(false),
});

// ============== Booking Schemas ==============

const createAppointmentSchema = Joi.object({
  counsellorId: Joi.string().required().messages({
    'any.required': 'Counsellor ID is required',
  }),
  date: Joi.date().iso().required().messages({
    'any.required': 'Date is required',
  }),
  timeSlot: Joi.object({
    start: Joi.string().required(),
    end: Joi.string().required(),
  }).required(),
  type: Joi.string().valid('online', 'in_person').default('online'),
  reason: Joi.string().max(500).optional().allow(''),
  isAnonymous: Joi.boolean().default(false),
});

const updateAppointmentSchema = Joi.object({
  status: Joi.string()
    .valid('pending', 'confirmed', 'completed', 'cancelled', 'no_show')
    .optional(),
  meetingLink: Joi.string().uri().optional().allow(''),
  notes: Joi.object({
    counsellorNotes: Joi.string().optional().allow(''),
    followUpRequired: Joi.boolean().optional(),
  }).optional(),
});

// ============== Mood Schemas ==============

const moodEntrySchema = Joi.object({
  mood: Joi.string()
    .valid(
      'very_happy', 'happy', 'neutral', 'sad', 'very_sad',
      'anxious', 'angry', 'stressed'
    )
    .required(),
  moodScore: Joi.number().min(1).max(5).required(),
  note: Joi.string().max(500).optional().allow(''),
  activities: Joi.array()
    .items(
      Joi.string().valid(
        'exercise', 'study', 'social', 'sleep', 'meditation',
        'hobbies', 'eating', 'gaming', 'music', 'other'
      )
    )
    .optional(),
  stressLevel: Joi.number().min(1).max(10).default(5),
  sleepHours: Joi.number().min(0).max(24).optional(),
  triggers: Joi.array()
    .items(Joi.string())
    .optional(),
});

// ============== Community Schemas ==============

const forumPostSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  content: Joi.string().min(10).max(5000).required(),
  category: Joi.string()
    .valid(
      'exam_stress', 'loneliness', 'homesickness', 'career_anxiety',
      'depression', 'anxiety', 'sleep', 'relationships',
      'self_care', 'success_stories', 'general'
    )
    .required(),
  isAnonymous: Joi.boolean().default(true),
});

const forumCommentSchema = Joi.object({
  content: Joi.string().min(1).max(2000).required(),
  isAnonymous: Joi.boolean().default(true),
});

module.exports = {
  validate,
  registerSchema,
  loginSchema,
  updateProfileSchema,
  changePasswordSchema,
  chatMessageSchema,
  screeningSubmitSchema,
  createAppointmentSchema,
  updateAppointmentSchema,
  moodEntrySchema,
  forumPostSchema,
  forumCommentSchema,
};
