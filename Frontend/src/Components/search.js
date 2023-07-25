import React from 'react'
import './search.css'; 

export default function search() {
  return (
    <div>
        <h1 className='topic1'>Find a specialize Doctor in Sri Lanka</h1>

        <div className="doctor-search-content">
        <input type="text" placeholder="Enter doctor's name" className="doctor-search-input" />
        <select className="doctor-specialty-select">
          <option value="">Select Specialty</option>
          <option value="cardiologist">Cardiologist</option>
          <option value="dermatologist">Dermatologist</option>
          <option value="neurologist">Neurologist</option>
          <option value="pediatrician">Pediatrician</option>
        </select>
        <button className="find-doctor-button">Find Doctor</button>
      </div>

    </div>
  )
}
