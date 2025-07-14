// src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, enum: ['therapist', 'admin'], default: 'therapist' },
  isActive: { type: Boolean, default: true },
  googleCalendarId: String,
  googleRefreshToken: String,
  profile: {
    phone: String,
    address: String,
    specializations: [String],
    licenseNumber: String
  }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model('User', userSchema);