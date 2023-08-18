import * as React from "react";
import { useState, useEffect } from "react";
import "./doc_profile.css";
import LoginImage from "../../src/Images/real-doc.jpg";
import { URL } from "../env";
import axios from "axios";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Compressor from "compressorjs"; // Import the compressorjs library

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

//import Table from '@mui/material/Table';
// or
import { Table } from "@mui/material";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const shaka = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const DoctorProfile = ({ doctor }) => {
  // const handleBookAppointment = () => {
  //   doctor.specialization = "Specia";
  //   doctor.name = "Dela";
  //   // You can implement your booking logic here, such as opening a modal or redirecting to a booking page
  //   console.log(`Booking appointment with ${doctor.name}`);
  // };

  const [appointmentData, setappointmentData] = useState(null);
  const [error, setError] = useState(null);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(URL + "/docprofile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDetails(response.data);
        setappointmentData(response.data.appointments);

        console.log(appointmentData);
      } catch (error) {
        setError(error.response.data.msg);
      }
    };

    fetchUserData();
  }, []);

  function convertToBase64(e) {
    const file = e.target.files[0];

    // Use Compressor to compress the image before converting to base64
    new Compressor(file, {
      quality: 0.1, // Adjust the quality (0 to 1) to your desired level
      maxWidth: 800, // Set the maximum width (in pixels) for the compressed image
      maxHeight: 800, // Set the maximum height (in pixels) for the compressed image
      success(result) {
        // Result is the compressed Blob
        const reader = new FileReader();
        reader.readAsDataURL(result);
        reader.onload = () => {
          setImage(reader.result);
        };
      },
      error(error) {
        console.error("Error compressing image:", error);
      },
    });
  }

  const [image, setImage] = useState("");

  function uploadImage() {
    const token = localStorage.getItem("token");
    fetch(URL + "/uploadDocPic", {
      method: "POST",
      crossDomain: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Acess-Control-Allow-Original": "*",
      },
      body: JSON.stringify({
        base64: image,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchProfilePicture(); // Fetch the updated profile picture after uploading
      });
  }

  const [profilePicture, setProfilePicture] = useState("");

  function fetchProfilePicture() {
    const token = localStorage.getItem("token");
    console.log("done");

    axios
      .get(URL + "/getDocPic", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          const { image } = res.data;
          setProfilePicture(image);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchProfilePicture();
  }, []);

  return (
    <div className="doctor-profile">
      <div className="doctor-details">
        <Button
          variant="contained"
          sx={{ width: "100%", margin: "2% auto" }}
          onClick={uploadImage}
        >
          Change profile picture
        </Button>
        <label for="file-input" className="plus">
          <label htmlFor="fileInput" className="custom-file-input">
            +
          </label>
          <input
            id="fileInput"
            type="file"
            className="pro"
            accept="image/*"
            onChange={convertToBase64}
            style={{ display: "none" }}
          />
        </label>
        <img src={profilePicture} alt="Doc_name" className="real-doc" />

        {/* Check if details is not null before accessing its properties */}
        {details !== null ? (
          <>
            <h1>{details.docname}</h1>
            <h3>{details.speciality}</h3>
            <p>{details.workingHospital}</p>
            <p class="doc_main_profile_para">{/* ... (rest of the text) */}</p>
          </>
        ) : (
          <p>Loading doctor details...</p>
        )}
      </div>
      <TableContainer sx={{ width: "40%" }} component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>{/* ... (TableHead content) */}</TableHead>
          <TableBody>
            {appointmentData !== null ? (
              // Map over the appointmentData only if it's not null
              appointmentData.map((row) => {
                const dateObj = new Date(row.date);
                const formattedDate = dateObj.toLocaleDateString();
                const formattedTime = dateObj.toLocaleTimeString();

                return (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="middle">{formattedDate}</TableCell>
                    <TableCell align="middle">{formattedTime}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              // Show a loading message or any desired UI when appointmentData is null
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Loading appointment data...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DoctorProfile;
