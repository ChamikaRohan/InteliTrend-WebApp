import React from 'react';
import './doc_profile.css'; 
import LoginImage from '../../src/Images/real-doc.jpg';
import {URL} from '../env'

//import Table from '@mui/material/Table';
// or
import { Table } from '@mui/material';

const DoctorProfile = ({ doctor }) => {
  const handleBookAppointment = () => {
    doctor.specialization = "Specia";
    doctor.name = "Dela";
    // You can implement your booking logic here, such as opening a modal or redirecting to a booking page
    console.log(`Booking appointment with ${doctor.name}`);
  };        



  return (  
    <div className="doctor-profile">    
      <div className="doctor-details">  
      <img src={LoginImage} alt="Doc_name" className="real-doc" />

        <h2>Dr. Dilshara Herath</h2>  
        <p>Consultant Cardiologist Surgeon</p>
        <p>kandy General hospital</p>
        <p class='doc_main_profile_para'><br></br>Dr. Dilshara Herath is a highly skilled and experienced Consultant Cardiologist Surgeon, specializing in the field of cardiology and heart surgery. With a focus on providing top-notch medical care, Dr. Herath is renowned for his expertise in diagnosing and treating various cardiac conditions.

He practices at the prestigious Kandy General Hospital, a leading healthcare institution known for its commitment to patient well-being and cutting-edge medical services. Dr. Herath's dedication to patient care and advanced surgical techniques has earned him a reputation as a trusted expert in his field.

Patients benefit from his compassionate approach, as he takes the time to understand their unique medical needs and provide personalized treatment plans. Dr. Herath's commitment to excellence and continuous pursuit of medical advancements make him a valuable asset to the healthcare community and a trusted choice for patients seeking cardiac care.</p>     
      </div>
      <button className="book-appointment-button" onClick={handleBookAppointment}>
        Book Appointment
      </button>
          
    </div>  
  );
};

export default DoctorProfile;
