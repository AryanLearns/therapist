// src/models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'cancelled', 'completed', 'no-show'],
    default: 'scheduled'
  },
  type: {
    type: String,
    enum: ['initial', 'follow-up', 'group', 'family'],
    default: 'follow-up'
  },
  location: String,
  notes: String,
  googleEventId: String, // For Google Calendar integration
  reminderSent: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
