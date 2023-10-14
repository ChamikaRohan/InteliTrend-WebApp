import "./appointments.css";
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

const MyStyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "blue",
  color: "white",
  "&:hover": {
    backgroundColor: "darkblue",
  },
}));

export default function Appointments() {
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

      const response = await axios.get(URL + "/pat_appointments", {
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
        console.log("wade hari")
        const Data = await fetchAppointmentData();
        console.log("Received data", appointmentData);
        setappointmentData(Data);
      } catch (error) {
        setError(error.response?.data.msg || "An error occurred");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="appointmentContainer">
      <TableContainer sx={{ width: "40%" }} component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <Typography variant="h6" style={{ textAlign: "center" }}>
                APPOINTMENTS
              </Typography>
            </TableRow>
            <TableRow>
              <TableCell align="center">Doctor</TableCell>
              <TableCell align="center">Place</TableCell>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center"> </TableCell>{" "}
              {/* Adding an Actions column header */}
            </TableRow>
          </TableHead>
          <TableBody>
            {appointmentData !== null ? (
              // Map over DOC only if it's not null
              appointmentData.map((doctor) =>
                doctor.appointments.map((appointment, index) => {
                  const dateObj = new Date(appointment.date);
                  const formattedDate = dateObj.toLocaleDateString();
                  const formattedTime = dateObj.toLocaleTimeString();

                  const handleDeleteAppointment = async () => {
                    console.log("sgdsjhnksjaja");
                    try {
                      // Make a DELETE request to delete the appointment
                      await axios.delete(
                        URL + `/userDelete/${appointment._id}/${doctor._id}`,
                        {
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                              "token"
                            )}`,
                          },
                        }
                      );

                      // Handle the appointment deletion in the UI (e.g., remove the deleted row from the table)
                      // You may need to update the state or re-fetch the appointment data

                      console.log("Appointment deleted successfully");
                      //window.location.reload();
                    } catch (error) {
                      console.error("Error deleting appointment:", error);
                    }
                  };

                  return (
                    <TableRow key={appointment._id}>
                      <TableCell component="th" scope="row">
                        {doctor.docname}
                      </TableCell>
                      <TableCell>{doctor.workingHospital}</TableCell>
                      <TableCell>{formattedDate}</TableCell>
                      <TableCell>{formattedTime}</TableCell>
                      <TableCell>
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
              )
            ) : (
              // Show a loading message or any desired UI when DOC is null
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Loading appointment data...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
