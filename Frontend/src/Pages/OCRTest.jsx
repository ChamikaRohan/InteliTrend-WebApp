import React, { useState } from 'react';
import axios from 'axios';
import { URL } from '../env';

const OCRTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState({});
  const [error, setError] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(URL + '/performOCR', { pdfPath: './uploads/mydoc.pdf' });
      console.log('Call from front 2');

      // Extract details manually from OCR text
      const ocrText = response.data.ocrTextbyme;
      const lines = ocrText.split('\n');
      const extractedDetails = {};

      lines.forEach(line => {
        if (line.includes('Blood Group:')) {
          extractedDetails.bloodGrp = line.split('Blood Group:')[1].trim();
        } else if (line.includes('Pulse:')) {
          extractedDetails.pulse = line.split('Pulse:')[1].trim();
        } else if (line.includes('Height:')) {
          extractedDetails.height = line.split('Height:')[1].trim();
        } else if (line.includes('Weight:')) {
          extractedDetails.weight = line.split('Weight:')[1].trim();
        } else if (line.includes('Blood pressure:')) {
          extractedDetails.blood_pressure = line.split('Blood pressure:')[1].trim();
        } else if (line.includes('Breathing:')) {
          extractedDetails.breathing = line.split('Breathing:')[1].trim();
        } else if (line.includes('Temperature:')) {
          extractedDetails.temperature = line.split('Temperature:')[1].trim();
        } else if (line.includes('BMI:')) {
          extractedDetails.bmi = line.split('BMI:')[1].trim();
        } else if (line.includes('Suger:')) {
          extractedDetails.suger = line.split('Suger:')[1].trim();
        } else if (line.includes('Kolestrol:')) {
          extractedDetails.kolestrol = line.split('Kolestrol:')[1].trim();
        } else if (line.includes('Platelet:')) {
          extractedDetails.platelet = line.split('Platelet:')[1].trim();
        } else if (line.includes('Oxygen:')) {
          extractedDetails.oxygen = line.split('Oxygen:')[1].trim();
        } 
      });

      setDetails(extractedDetails);

      uploadOCRtoDB(extractedDetails);

    } catch (error) {
      setError('Error processing the PDF document.');
    } finally {
      setIsLoading(false);
    }
  };

  const uploadOCRtoDB = async (extractedDetails) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(URL + '/OCRtoDB', 
      { 
        bloodGrp: extractedDetails.bloodGrp,
        pulse: extractedDetails.pulse ,
        height: extractedDetails.height ,
        weight: extractedDetails.weight ,
        blood_pressure: extractedDetails.blood_pressure ,
        breathing: extractedDetails.breathing ,
        temperature: extractedDetails.temperature,
        bmi: extractedDetails.bmi ,
        suger: extractedDetails.suger ,
        kolestrol: extractedDetails.kolestrol ,
        platelet: extractedDetails.platelet ,
        oxygen: extractedDetails.oxygen ,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('OCR details uploaded to the backend.');
    } catch (error) {
      console.error('Error uploading OCR details to the backend:', error);
    }
  };

  return (
    <div>
      <h1>OCR Test</h1>
      <form onSubmit={handleFormSubmit}>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      {Object.keys(details).length > 0 && (
        <div>
          <h2>Extracted Details</h2>
          <ul>
            <li><strong>Sugar:</strong> {details.sugar}</li>
            <li><strong>Blood Group:</strong> {details.bloodGrp}</li>
            <li><strong>Patlet:</strong> {details.Platelet}</li>
            {/* Add more list items for other values */}
          </ul>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default OCRTest;
