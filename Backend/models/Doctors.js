const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  docname: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
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
  phone: {
    type: Number,
    required: true
  },
  workingHospital: {
    type: String,
    required: true
  },
  speciality: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  gmoaRegNum: {
    type: String,
    required: true
  },  
  password: {
    type: String,
    required: true
  }
});

const Doctor = mongoose.model('Doctor', DoctorSchema, 'Doctors');

module.exports = Doctor;