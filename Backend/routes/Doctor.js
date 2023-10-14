const express = require("express");
const Doctor = require("../models/Doctors");
const Registration = require("../models/Registrations");
const router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { MongoClient, GridFSBucket } = require("mongodb").MongoClient;
const path = require("path");
const { ObjectId } = require("mongodb");
const { Console } = require("console");
const fs = require("fs");

const nodemailer = require('nodemailer');
const mongodb = require("mongodb");

// Define storage location and filename for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const token = req.headers.authorization.split(" ")[1];
    const type = req.headers.type; // Extract the Type header value
    const decoded = jwt.verify(token, "your secret here");
    const userId = decoded.userId;
    const nsubfolder = `uploads/${userId}`;
    const subfolder = `${nsubfolder}/${type}`;
    fs.mkdirSync(subfolder, { recursive: true });
    cb(null, subfolder);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// Initialize multer with the defined storage settings
const upload = multer({ storage: storage });

// Define the POST route for file upload
router.post("/grp7/api/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // Do something with the uploaded file, such as saving it to a database or displaying it on a webpage

  try {
    console.log("try");
    const token = req.headers.authorization.split(" ")[1];
    const type = req.headers.type; // Extract the Type header value
    // Verify the JWT token
    const decoded = jwt.verify(token, "your secret here");
    const userId = decoded.userId;
    // Save the file to the local disk
    const filePath = `uploads/${userId}/${type}/${req.file.filename}`;
    await fs.promises.rename(req.file.path, filePath);

    // Send a success response back to the client
    return res.status(200).json({
      success: true,
      message: "File uploaded successfully.",
      filePath: filePath,
    });
  } catch (error) {
    console.log("err");
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error while saving file.",
      error: error,
    });
  }
});

// Route to handle POST requests to create a new registration document in the database
router.post("/grp7/api/doctor", async (req, res) => {
  try {
    const {
      docname,
      dob,
      nic,
      email,
      phone,
      workingHospital,
      speciality,
      experience,
      gmoaRegNum,
      password,
    } = req.body;

    // Create a new registration document using the Registration model
    const doctor = new Doctor({
      docname,
      dob,
      nic,
      email,
      phone,
      workingHospital,
      speciality,
      experience,
      gmoaRegNum,
      password,
    });

    // Save the new registration document to the database
    const savedDoctor = await doctor.save();

    // Respond with the saved registration document as JSON
    res.json(savedDoctor);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/grp7/api/book-appointment", async (req, res) => {
  try {
    const { doctorId, date } = req.body;

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "your secret here");
    const userId = decoded.userId;

    const user = await Registration.findOne({ _id: userId });
    const firstName = user.firstName;
    const lastName = user.lastName;

    console.log("API called", doctorId, date, firstName);

    const existingAppointment = await Doctor.findOne({
      _id: doctorId,
      "appointments.date": new Date(date),
    });

    if (existingAppointment) {
      // Appointment already exists for the specified date
      return res
        .status(400)
        .json({ message: "Appointment already booked for this date." });
    }

    await Doctor.findByIdAndUpdate(
      doctorId,
      {
        $push: {
          appointments: { name: `${firstName} ${lastName}`, date: date },
        },
      },
      { new: true }
    );
    console.log("Appointment booked successfully.");
    res.status(201).json({ message: "Appointment booked successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while booking the appointment." });
  }
});

router.get("/grp7/api/docprofile", async (req, res) => {
  try {
    // Get the JWT token from the request header
    const token = req.headers.authorization.split(" ")[1];

    // Verify the JWT token
    const decoded = jwt.verify(token, "your secret here");

    // Get the user data based on the email in the JWT token
    const user = await Doctor.findOne({ _id: decoded.userId });

    // If no user is found, respond with an error message
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // If the user is found, respond with the user data
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/grp7/api/getDocPic", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "your secret here");
    const userId = decoded.userId;

    // Retrieve the user from the database based on the user ID
    const user = await Doctor.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const { image } = user; // Get the image property from the user document

    // Send the image as a response
    res.status(200).json({
      success: true,
      message: "Profile picture retrieved successfully.",
      image: image,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while retrieving profile picture.",
      error: error,
    });
  }
});

router.post("/grp7/api/uploadDocPic", async (req, res) => {
  const { base64 } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "your secret here");
  const userId = decoded.userId;
  try {
    await Doctor.findByIdAndUpdate(userId, { image: base64 });
    res.send({ Status: "ok" });
  } catch (error) {
    res.send({ Status: "error", data: error });
  }
});

// Route to handle POST requests to authenticate a user
router.post("/grp7/api/docauth", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user with the specified NIC and password
    const user = await Doctor.findOne({ email, password });

    // If no user is found, respond with an error message
    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // If the user is found, respond with a success message
    const token = jwt.sign({ userId: user._id }, "your secret here");

    console.log(`Token: ${token}`);
    res.json({ token, msg: "Authenticated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/grp7/api/doclist", async (req, res) => {
  try {
    const alldocs = await Doctor.find({});
    res.send({ status: "ok", data: alldocs });
  } catch (error) {
    console.log("connection error", error);
  }
});

// Delete an appointment by appointment ID
router.delete("/grp7/api/appointments/:appointmentId", async (req, res) => {
  try {
    console.log("Backend API");
    // Get the JWT token from the request header
    const token = req.headers.authorization.split(" ")[1];

    // Verify the JWT token
    const decoded = jwt.verify(token, "your secret here");

    // Get the user (doctor) data based on the email in the JWT token
    const user = await Doctor.findOne({ _id: decoded.userId });

    // If no user (doctor) is found, respond with an error message
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Extract the appointmentId from the URL params
    const appointmentId = req.params.appointmentId;

    const APP = user.appointments.find(
      (appointment) => appointment._id.toString() === appointmentId
    );

    const appointmentName = APP.name;

    const nameParts = appointmentName.split(" ");

    // nameParts will now be an array containing the split parts
    const FName = nameParts[0];
    const LName = nameParts[1];

    const patient = await Registration.findOne({ firstName: FName });

    // Create a notification message
    const notificationMessage = `Please note that: Appointment for Dr.${user.docname} has been cancelled`;

    // Send an email notification
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'intelitrend3@gmail.com',
        pass: 'dtzwrcsuxboorzxy'
      }
    });

    const mailOptions = {
      from: 'intelitrend3@gmail.com',
      to: patient.email, // Use the patient's email address
      subject: 'Appointment Cancellation Notification',
      text: notificationMessage
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    // Update the patient's notification
    patient.notification = notificationMessage;
    await patient.save();

    // Find the appointment in the doctor's appointment array (assuming 'appointments' is an array field in the Doctor model)
    const appointmentIndex = user.appointments.findIndex(
      (appointment) => appointment._id.toString() === appointmentId
    );

    // If the appointment is not found, respond with an error message
    if (appointmentIndex === -1) {
      return res.status(404).json({ msg: "Appointment not found" });
    }

    // Remove the appointment from the doctor's appointments array
    user.appointments.splice(appointmentIndex, 1);

    // Save the updated user (doctor) data
    await user.save();

    // Respond with a success message
    res.json({ msg: "Appointment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


// Delete an appointment by appointment ID by patient
router.delete(
  "/grp7/api/userDelete/:appointmentId/:doctorId",
  async (req, res) => {
    try {
      // console.log("Backend API");
      // // Get the JWT token from the request header
      // const token = req.headers.authorization.split(' ')[1];

      // // Verify the JWT token
      // const decoded = jwt.verify(token, 'your secret here');
      const appointmentId = req.params.appointmentId;
      const docId = req.params.doctorId;

      // Get the user (doctor) data based on the email in the JWT token
      const user = await Doctor.findOne({ _id: docId });

      // If no user (doctor) is found, respond with an error message
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      // Extract the appointmentId from the URL params

      // Find the appointment in the doctor's appointment array (assuming 'appointments' is an array field in the Doctor model)
      const appointmentIndex = user.appointments.findIndex(
        (appointment) => appointment._id.toString() === appointmentId
      );

      // If the appointment is not found, respond with an error message
      if (appointmentIndex === -1) {
        return res.status(404).json({ msg: "Appointment not found" });
      }

      // Remove the appointment from the doctor's appointments array
      user.appointments.splice(appointmentIndex, 1);

      // Save the updated user (doctor) data
      await user.save();

            const doctorIDa = req.params.doctorId;
            const doctor = await Doctor.findById(doctorIDa);
            const doctorEmail = doctor.email; 
            console.log(doctorEmail); // Assuming 'email' is the field that stores the doctor's email
            //console.log(req);
            // Send an email to the doctor
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'intelitrend3@gmail.com', // Your Gmail account
              pass: 'dtzwrcsuxboorzxy' // Your Gmail password or an app-specific password
            }
          });
      
          const mailOptions = {
            from: 'intelitrend3@gmail.com', // Your Gmail account
            to: doctorEmail, // Doctor's email
            subject: 'Appointment Cancellation Notification',
            text: 'An appointment has been canceled by a patient.' // Customize the message
          };
      
          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          })
      
      // Respond with a success message
      res.json({ msg: "Appointment deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
