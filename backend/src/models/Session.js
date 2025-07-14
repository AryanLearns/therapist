// src/models/Session.js
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  duration: Number, // in minutes
  sessionNotes: String,
  treatmentPlan: String,
  homework: String,
  nextSessionGoals: String,
  patientMood: {
    type: String,
    enum: ['excellent', 'good', 'neutral', 'poor', 'critical']
  },
  progressRating: { type: Number, min: 1, max: 10 },
  attachments: [{
    filename: String,
    url: String,
    uploadDate: Date
  }]
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
