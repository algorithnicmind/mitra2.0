const mongoose = require('mongoose');

const ForumCommentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ForumPost',
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
      minlength: [2, 'Comment must be at least 2 characters long'],
      maxlength: [2000, 'Comment cannot exceed 2000 characters'],
    },
    isAnonymous: {
      type: Boolean,
      default: false,
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
    isReported: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes mapping comments to posts and authors
ForumCommentSchema.index({ post: 1, createdAt: 1 });
ForumCommentSchema.index({ author: 1 });

module.exports = mongoose.model('ForumComment', ForumCommentSchema);
