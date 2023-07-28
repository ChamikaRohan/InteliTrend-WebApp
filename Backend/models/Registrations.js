const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  nic: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  mobileNumber: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  doc: [{
    type: Buffer,
    required: false
  }],
  heart: [{
    type: Buffer,
    required: false
  }],
  brain: [{
    type: Buffer,
    required: false
  }],
  diabetics: [{
    type: Buffer,
    required: false
  }],
  bonefractures: [{
    type: Buffer,
    required: false
  }],
  general: [{
    type: Buffer,
    required: false
  }],
  other: [{
    type: Buffer,
    required: false
  }]
});

const Registration = mongoose.model('Registration', RegistrationSchema, 'Registrations');

module.exports = Registration;
