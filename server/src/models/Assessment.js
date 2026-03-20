const mongoose = require('mongoose');

const AssessmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['PHQ-9', 'GAD-7'],
      required: true,
    },
    responses: [
      {
        questionId: {
          type: String,
          required: true,
        },
        answerValue: {
          type: Number,
          required: true,
        },
      },
    ],
    totalScore: {
      type: Number,
      required: true,
      min: 0,
      max: 27, // Max for PHQ-9. GAD-7 is 21. Needs to be flexible based on type.
    },
    severity: {
      type: String,
      enum: ['Minimal', 'Mild', 'Moderate', 'Moderately Severe', 'Severe'],
      required: true,
    },
    recommendation: {
      type: String,
    },
    crisisRisk: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

AssessmentSchema.index({ user: 1 });
AssessmentSchema.index({ type: 1 });
AssessmentSchema.index({ severity: 1 });

module.exports = mongoose.model('Assessment', AssessmentSchema);
