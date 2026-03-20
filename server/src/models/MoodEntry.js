const mongoose = require('mongoose');

const MoodEntrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    mood: {
      type: String,
      enum: ['Happy', 'Sad', 'Anxious', 'Angry', 'Neutral', 'Excited', 'Stressed', 'Calm'],
      required: true,
    },
    intensity: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    tags: {
      type: [String],
      default: [], // e.g., 'exam', 'friends', 'assignment'
    },
    notes: {
      type: String,
      maxlength: 1000,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

MoodEntrySchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('MoodEntry', MoodEntrySchema);
