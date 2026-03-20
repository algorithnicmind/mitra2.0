const mongoose = require('mongoose');

const ForumPostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [5, 'Title must be at least 5 characters long'],
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    content: {
      type: String,
      required: true,
      minlength: [10, 'Content must be at least 10 characters long'],
      maxlength: [5000, 'Content cannot exceed 5000 characters'],
    },
    category: {
      type: String,
      enum: ['General', 'Academics', 'Relationships', 'Mental Health', 'Career', 'Other'],
      default: 'General',
    },
    tags: {
      type: [String],
      default: [],
    },
    isAnonymous: {
      type: Boolean,
      default: false, // If true, display anonymous alias instead of real name
    },
    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    downvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for comment count
ForumPostSchema.virtual('comments', {
  ref: 'ForumComment',
  localField: '_id',
  foreignField: 'post',
  count: true,
});

// Configure options for virtuals
ForumPostSchema.set('toJSON', { virtuals: true });
ForumPostSchema.set('toObject', { virtuals: true });

// Indexes for faster querying
ForumPostSchema.index({ category: 1, createdAt: -1 });
ForumPostSchema.index({ tags: 1 });
ForumPostSchema.index({ author: 1 });

module.exports = mongoose.model('ForumPost', ForumPostSchema);
