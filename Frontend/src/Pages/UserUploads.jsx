import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserUploads() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/uploads', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // send the JWT token in the Authorization header
      }
    })
      .then(response => {
        setFiles(response.data.files);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>My Uploads</h1>
      {files.map(file => (
        <img key={file._id} src={`http://localhost:8000/uploads/${file.filename}`} alt={file.filename} />
      ))}
    </div>
  );
}

export default UserUploads;
