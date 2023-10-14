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
  }],
  blood_grp: {
    type: String,
    required: false
  },
  height: {
    type: String,
    required: false
  },
  weight: {
    type: String,
    required: false
  },
  blood_pressure: {
    type: String,
    required: false
  },
  breathing: {
    type: String,
    required: false
  },
  pulse: {
    type: String,
    required: false
  },
  temperature: {
    type: String,
    required: false
  },
  bmi: {
    type: String,
    required: false
  },
  suger: {
    type: String,
    required: false
  },
  kolestrol: {
    type: String,
    required: false
  },
  platelet: {
    type: String,
    required: false
  },
  oxygen: {
    type: String,
    required: false
  },
  notification: {
    type: String,
    required: false
  }

});

const Registration = mongoose.model('Registration', RegistrationSchema, 'Registrations');

module.exports = Registration;
