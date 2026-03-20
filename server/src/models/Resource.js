const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
    },
    description: {
      type: String,
      required: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    url: {
      type: String,
    },
    type: {
      type: String,
      enum: ['Article', 'Video', 'Podcast', 'Application', 'Helpline', 'Book', 'Other'],
      required: true,
    },
    category: {
      type: String,
      enum: ['Anxiety', 'Depression', 'Stress', 'General', 'Sleep', 'Self-care', 'Academics'],
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Admin who created it
    },
    views: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
ResourceSchema.index({ type: 1, category: 1 });
ResourceSchema.index({ tags: 1 });

module.exports = mongoose.model('Resource', ResourceSchema);
