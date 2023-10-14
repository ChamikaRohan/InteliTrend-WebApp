import * as React from "react";
import { useState, useEffect } from "react";
import "./doc_profile.css";
import LoginImage from "../../src/Images/real-doc.jpg";
import { URL } from "../env";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Compressor from "compressorjs"; // Import the compressorjs library

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

//import Table from '@mui/material/Table';
// or
import { Table } from "@mui/material";
import placeholderImage from '../Images/Doc_loading.jpg';

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
  const [docname, setDocname] = useState(null);
  const [speciality, setSpeciality] = useState(null);
  const [hospital, setHospital] = useState(null);

  const fetchAppointmentData = async () => {
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

      return response.data; // Return the appointment data
    } catch (error) {
      throw error; // Rethrow the error for error handling later
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointmentData = await fetchAppointmentData();
        setappointmentData(appointmentData.appointments);
        setDocname(appointmentData.docname);
        setSpeciality(appointmentData.speciality);
        setHospital(appointmentData.workingHospital);
      } catch (error) {
        setError(error.response?.data.msg || "An error occurred");
      }
    };

    fetchData();
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
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };

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

  // Function to delete an appointment
  const deleteAppointment = async (appointmentId) => {
    try {
      // Make a DELETE request to the backend endpoint
      const response = await axios.delete(
        `/grp7/api/docprofile/appointments/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the JWT token in the request header
          },
        }
      );

      // Check if the appointment was deleted successfully
      if (response.status === 200) {
        // Handle success (e.g., update the UI, remove the deleted appointment from the UI)
        console.log("Appointment deleted successfully");
      }
    } catch (error) {
      // Handle any errors (e.g., display an error message to the user)
      console.error("Error deleting appointment:", error);
    }
  };

  // const handleDeleteAppointment = async (appointmentId) => {
  //   try {
  //     // Make a DELETE request to delete the appointment
  //     await axios.delete(URL + `/appointments/${appointmentId}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     });

  //     // Refresh the appointment data
  //     const updatedAppointmentData = await fetchAppointmentData();
  //     setappointmentData(updatedAppointmentData);

  //     console.log('Appointment deleted successfully');
  //   } catch (error) {
  //     console.error('Error deleting appointment:', error);
  //   }
  // };

  return (
    <div className="doctor-profile">
      <div className="doctor-details">
        {/* <Button
          variant="contained"
          sx={{ width: "100%", margin: "2% auto" }}
          onClick={uploadImage}
        >
          Change profile picture
        </Button> */}
        <div className="img">
          <img src={profilePicture || placeholderImage} alt="Doc_name" className="real-doc" />
        </div>

        <div className="change">
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
          <button type="button" className="uploadbut" onClick={uploadImage}>
            &#10004;
          </button>
        </div>

        <>
          <h1>Dr. {docname} </h1>
          <h3>{speciality}</h3>
          <p>{hospital}</p>
        </>
        <h1>
          <button className="buttonlogout" onClick={handleLogout}>
            <span className="labletext">Logout</span>
          </button>
        </h1>
      </div>
      

      <TableContainer sx={{ width: "40%" }} component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <Typography variant="h6" style={{ textAlign: "center" }}>
                APPOINTMENTS
              </Typography>
            </TableRow>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center"> </TableCell>{" "}
              {/* Adding an Actions column header */}
            </TableRow>
          </TableHead>
          <TableBody>
            {appointmentData !== null ? (
              // Map over the appointmentData only if it's not null
              appointmentData.map((row) => {
                const dateObj = new Date(row.date);
                const formattedDate = dateObj.toLocaleDateString();
                const formattedTime = dateObj.toLocaleTimeString();

                // Event handler to delete the appointment
                const handleDeleteAppointment = async () => {
                  console.log("sgdsjhnksjaja");
                  try {
                    // Make a DELETE request to delete the appointment
                    await axios.delete(URL + `/appointments/${row._id}`, {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    });

                    // Handle the appointment deletion in the UI (e.g., remove the deleted row from the table)
                    // You may need to update the state or re-fetch the appointment data

                    console.log("Appointment deleted successfully");
                    window.location.reload();
                  } catch (error) {
                    console.error("Error deleting appointment:", error);
                  }
                };

                return (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{formattedDate}</TableCell>
                    <TableCell align="center">{formattedTime}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={handleDeleteAppointment}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
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
