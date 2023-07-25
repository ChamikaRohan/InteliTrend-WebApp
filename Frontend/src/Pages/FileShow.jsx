import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PhotoList() {
  const [photos, setPhotos] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:8000/photos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        setPhotos(response.data.files);
        setUserId(response.data.Id);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(photos);

  return (
    <div>
      <h1>Photos</h1>
      {photos.map((photo) => (
        <div key={photo}>
          <img src={`../../Backend/uploads/${userId}/Brain`} />
          <p>{photo}</p>
        </div>
      ))}
    </div>
  );
}

export default PhotoList;
