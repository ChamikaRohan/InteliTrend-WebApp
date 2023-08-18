import React, { useState } from 'react';
import axios from 'axios';
import { URL } from "../env";

function TestUp() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('pdf', selectedFile);

      const response = await axios.post(URL+'/uploadtolocal', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message);
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file.');
    }
  };

  return (
    <div>
      <h1>PDF Upload</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload PDF</button>
      <p>{message}</p>
    </div>
  );
}

export default TestUp;
