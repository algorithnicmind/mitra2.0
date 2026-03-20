const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sender: {
      type: String,
      enum: ['user', 'ai', 'counsellor'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    emotions: {
      type: [String],
      default: [],
    },
    riskScore: {
      type: Number,
      default: 0,
    },
    isCrisis: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
ChatMessageSchema.index({ sessionId: 1, createdAt: 1 });
ChatMessageSchema.index({ user: 1 });

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
