const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    counsellor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    timeSlot: {
      start: {
        type: String,
        required: true, // e.g., '10:00'
      },
      end: {
        type: String,
        required: true, // e.g., '11:00'
      },
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    type: {
      type: String,
      enum: ['online', 'in-person'],
      default: 'online',
    },
    meetingLink: {
      type: String, // If type is online
    },
    notes: {
      type: String,
      maxlength: 1000,
    },
    counsellorNotes: {
      type: String, // Private notes for the counsellor
      maxlength: 2000,
    },
    cancellationReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster querying
AppointmentSchema.index({ student: 1, date: -1 });
AppointmentSchema.index({ counsellor: 1, date: -1 });
AppointmentSchema.index({ status: 1 });

module.exports = mongoose.model('Appointment', AppointmentSchema);
