const express = require("express");
const Registration = require("../models/Registrations");
const Doctor = require("../models/Doctors");
const router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { MongoClient, GridFSBucket } = require("mongodb");
const path = require("path");
const { ObjectId } = require("mongodb");
const { Console } = require("console");
const fs = require("fs");
const { pdfToImages } = require("../OCR_Process/pdfProcessing"); // Assuming pdfProcessing.js contains the pdfToImages function

// Define storage location and filename for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename as the new filename
  },
});

// Initialize multer with the defined storage settings
const upload = multer({ storage: storage });

// Set up a route for uploading PDF files to the '/upload' folder
router.post("/grp7/api/uploadtolocal", upload.single("pdf"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const uploadedFilePath = req.file.path;
  return res.status(200).json({
    message: "File uploaded successfully.",
    filePath: uploadedFilePath,
  });
});

// Define the POST route for file upload
router.post("/grp7/api/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    console.log("try");
    const token = req.headers.authorization.split(" ")[1];
    const type = req.headers.type; // Extract the Type header value
    // Verify the JWT token
    const decoded = jwt.verify(token, "your secret here");
    const userId = decoded.userId;
    // Save the file to the local disk
    const filePath = `uploads`;
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

// Define the API endpoint to fetch the list of files
router.get("/grp7/api/filesshow", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const type = req.headers.type; // Extract the Type header value
    const decoded = jwt.verify(token, "your secret here");
    const userId = decoded.userId;
    const folderPath = `uploads/${userId}/${type}`;

    // Read the contents of the directory
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "Server error while fetching files.",
          error: err,
        });
      }

      // Filter out any non-file items
      const fileNames = files.filter((file) =>
        fs.statSync(path.join(folderPath, file)).isFile()
      );

      // Create an array of objects containing both file names and file paths
      const fileList = fileNames.map((file) => {
        return {
          fileName: file,
          filePath: `${folderPath}/${file}`,
        };
      });

      return res.status(200).json({
        success: true,
        files: fileList,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching files.",
      error: error,
    });
  }
});

router.post("/grp7/api/uploadpropic", async (req, res) => {
  const { base64 } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "your secret here");
  const userId = decoded.userId;
  try {
    await Registration.findByIdAndUpdate(userId, { image: base64 });
    res.send({ Status: "ok" });
  } catch (error) {
    res.send({ Status: "error", data: error });
  }
});

router.get("/grp7/api/photos", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // Verify the JWT token
    const decoded = jwt.verify(token, "your secret here");
    const userId = decoded.userId;
    // Get the list of files in the user's subdirectory
    const subfolder = `uploads/${userId}`;
    const files = await fs.promises.readdir(subfolder);
    // Send the list of files back to the client
    return res.status(200).json({
      success: true,
      message: "Photos retrieved successfully.",
      files: files,
      Id: userId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error while retrieving photos.",
      error: error,
    });
  }
});

router.get("/grp7/api/getpropic", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "your secret here");
    const userId = decoded.userId;

    // Retrieve the user from the database based on the user ID
    const user = await Registration.findById(userId);

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

// Route to handle POST requests to create a new registration document in the database
router.post("/grp7/api/register", async (req, res) => {
  try {
    const {
      title,
      firstName,
      lastName,
      nic,
      email,
      dateOfBirth,
      mobileNumber,
      password,
    } = req.body;

    // Create a new registration document using the Registration model
    const registration = new Registration({
      title,
      firstName,
      lastName,
      nic,
      email,
      dateOfBirth,
      mobileNumber,
      password,
    });

    // Save the new registration document to the database
    const savedRegistration = await registration.save();

    // Respond with the saved registration document as JSON
    res.json(savedRegistration);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Route to handle POST requests to authenticate a user
router.post("/grp7/api/auth", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user with the specified NIC and password
    const user = await Registration.findOne({ email, password });

    // If no user is found, respond with an error message
    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // If the user is found, respond with a success message
    const token = jwt.sign({ userId: user._id }, "your secret here");
    res.json({ token, msg: "Authenticated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/grp7/api/pat_appointments", async (req, res) => {
  try {
    const { doctorId, date } = req.body;
    
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "your secret here");
    const userId = decoded.userId;
    
    const user = await Registration.findOne({ _id: userId });
    const firstName = user.firstName;
    const lastName = user.lastName;
    console.log("API called");
    
    const Name = `${firstName} ${lastName}`;

    let DOC = [];
    Doctor.find({})
      .select("docname appointments workingHospital")
      .then((doctors) => {
        const filteredAppointments = doctors
          .map((doctor) => {
            doctor.appointments = doctor.appointments.filter(
              (appointment) => appointment.name === Name
            );
            return doctor;
          })
          .filter((doctor) => doctor.appointments.length > 0);

        // Now, send the filteredAppointments as a JSON response to the client
        res.json(filteredAppointments);
      })
      .catch((err) => {
        console.error(err);
        // Handle the error appropriately, e.g., sending an error response.
        res.status(500).json({ error: "An error occurred" });
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while booking the appointment." });
  }
});

// Route to handle GET requests to retrieve user data
router.get("/grp7/api/profile", async (req, res) => {
  try {
    // Get the JWT token from the request header
    const token = req.headers.authorization.split(" ")[1];

    // Verify the JWT token
    const decoded = jwt.verify(token, "your secret here");

    // Get the user data based on the email in the JWT token
    const user = await Registration.findOne({ _id: decoded.userId });

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

// Route to handle POST requests to upload documents to MongoDB
router.post("/grp7/api/upload-doc", upload.single("doc"), async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Get the JWT token from the request headers

    const decoded = jwt.verify(token, "your secret here");
    const userId = decoded.userId; // Retrieve the userId from the decoded token

    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded." });
    }

    // Read the file from the server's temporary storage
    const fileBuffer = fs.readFileSync(req.file.path);

    // Push the new document to the `doc` array in the user document
    await Registration.findByIdAndUpdate(userId, {
      $push: { doc: fileBuffer },
    });

    // Delete the temporary file from the server
    fs.unlinkSync(req.file.path);

    res.json({ msg: "Document uploaded successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while uploading document.");
  }
});

router.post("/grp7/api/upload-doce", upload.single("doc"), async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Get the JWT token from the request headers

    const decoded = jwt.verify(token, "your secret here");
    const userId = decoded.userId; // Retrieve the userId from the decoded token

    const type = req.headers.type;

    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded." });
    }

    // Read the file from the server's temporary storage
    const fileBuffer = fs.readFileSync(req.file.path);

    // Dynamically set the field name based on the 'type' value in the request
    const updateField = {};
    updateField[type] = fileBuffer;

    // Update the specified field in the user document
    await Registration.findByIdAndUpdate(userId, { $push: updateField });

    // Delete the temporary file from the server
    fs.unlinkSync(req.file.path);

    res.json({ msg: "Document uploaded successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while uploading document.");
  }
});

router.get("/grp7/api/get-doc", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Get the JWT token from the request headers

    const decoded = jwt.verify(token, "your secret here");
    const userId = decoded.userId; // Retrieve the userId from the decoded token
    const type = req.headers.type;

    // Find the user document by userId
    const user = await Registration.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }
    const fileBuffers = user[type]; // Get the array of file buffers based on the 'type' value

    if (!fileBuffers || fileBuffers.length === 0) {
      return res.status(404).json({ msg: "No files found." });
    }

    // Set the response content type as application/pdf
    res.contentType("application/pdf");

    // Send each file buffer as a separate response
    fileBuffers.forEach((fileBuffer) => {
      res.write(fileBuffer);
      res.write("\n\n\n\t\t"); // Add a separator between files
    });
    res.end();
  } catch (err) {
    console.log("Testfrome");
    console.error(err);
    res.status(500).send("Server error while retrieving files.");
  }
});

//OCR
router.post("/grp7/api/performOCR", async (req, res) => {
  try {
    const { pdfPath } = req.body; // Assuming you send the path of the PDF file as a request body
    const pdfBuffer = fs.readFileSync(pdfPath);

    // Convert PDF to images and perform OCR
    const ocrTextbyme = await pdfToImages(pdfBuffer);

    // Optionally, you can perform any additional processing on the images or OCR results here.

    res.json({ success: true, ocrTextbyme });
  } catch (error) {
    console.log("Error called");
    console.error("Error:", error);
    res
      .status(500)
      .json({ success: false, error: "Error processing the PDF document." });
  }

  router.post("/grp7/api/OCRtoDB", async (req, res) => {
    const bloodGrp = req.body.bloodGrp;
    const pulse = req.body.pulse;
    const height = req.body.height;
    const weight = req.body.weight;
    const blood_pressure = req.body.blood_pressure;
    const breathing = req.body.breathing;
    const temperature = req.body.temperature;
    const bmi = req.body.bmi;
    const suger = req.body.suger;
    const kolestrol = req.body.kolestrol;
    const platelet = req.body.platelet;
    const oxygen = req.body.oxygen;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "your secret here");
    const userId = decoded.userId;
    try {
      await Registration.findByIdAndUpdate(userId, {
        blood_grp: bloodGrp,
        pulse: pulse,
        height: height,
        weight: weight,
        blood_pressure: blood_pressure,
        breathing: breathing,
        temperature: temperature,
        bmi: bmi,
        suger: suger,
        kolestrol: kolestrol,
        platelet: platelet,
        oxygen: oxygen,
      });
      res.send({ Status: "ok" });
    } catch (error) {
      res.send({ Status: "error", data: error });
    }
  });
});

router.get("/grp7/api/notify", async (req, res) => {
  try {
    // Get the JWT token from the request header
    const token = req.headers.authorization.split(" ")[1];

    // Verify the JWT token
    const decoded = jwt.verify(token, "your secret here");

    // Get the user data based on the email in the JWT token
    const user = await Registration.findOne({ _id: decoded.userId });

    // If no user is found, respond with an error message
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // If the user is found, respond with the user data
    res.json({ success: true, notification: user.notification });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


router.get("/grp7/api/deletenotify", async (req, res) => {
  try {
    // Get the JWT token from the request header
    const token = req.headers.authorization.split(" ")[1];

    // Verify the JWT token
    const decoded = jwt.verify(token, "your secret here");

    // Get the user data based on the email in the JWT token
    const user = await Registration.findOne({ _id: decoded.userId });

    // If no user is found, respond with an error message
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // If the user is found, respond with the user data
    user.notification = null;
    await user.save();
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});




module.exports = router;
