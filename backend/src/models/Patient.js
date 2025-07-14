// src/models/Patient.js
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: String,
  phone: String,
  dateOfBirth: Date,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  },
  therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isActive: { type: Boolean, default: true },
  notes: String,
  medicalHistory: [String],
  allergies: [String]
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);