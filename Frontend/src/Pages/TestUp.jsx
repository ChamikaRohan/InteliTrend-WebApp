import React, { useState } from 'react';
import axios from 'axios';

function FileUploadCom() {
  const [file, setFile] = useState(null);

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('doc', file);

    const token = localStorage.getItem('token');

    axios
      .post('http://localhost:8000/upload-doce', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          type: 'brain'
        },
      })
      .then((response) => {
        console.log(response.data.msg);
        // Handle success response
      })
      .catch((error) => {
        console.error(error);
        // Handle error response
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
}

export default FileUploadCom;
