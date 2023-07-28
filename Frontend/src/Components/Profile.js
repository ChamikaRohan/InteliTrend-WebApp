import "./profile.css"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer, PolarAngleAxis, RadialBarChart, RadialBar, LineChart, Line } from 'recharts';
import profileImage from "../Images/profile-image.jpg";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../env";
import axios from "axios";
import Compressor from "compressorjs"; // Import the compressorjs library

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [image, setImage] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    fetchProfilePicture();
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

  const token = localStorage.getItem('token');
  function uploadImage() {
    fetch(URL+"/uploadpropic", {
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


  function fetchProfilePicture() {
    const token = localStorage.getItem('token');
  
    axios.get(URL+"/getpropic", {
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
    const fetchUserData = async () => {
      try {

        const token = localStorage.getItem('token');


        if (!token) {
          throw new Error('No token found');
          console.log('Eror in token variable');
        }

        const response = await axios.get(URL+'/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT token in request headers
          },
        });
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        setError(error.response.data.msg);
      }
    };


    fetchUserData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}><div id="wifi-loader">
    <svg class="circle-outer" viewBox="0 0 86 86">
        <circle class="back" cx="43" cy="43" r="40"></circle>
        <circle class="front" cx="43" cy="43" r="40"></circle>
        <circle class="new" cx="43" cy="43" r="40"></circle>
    </svg>
    <svg class="circle-middle" viewBox="0 0 60 60">
        <circle class="back" cx="30" cy="30" r="27"></circle>
        <circle class="front" cx="30" cy="30" r="27"></circle>
    </svg>
    <svg class="circle-inner" viewBox="0 0 34 34">
        <circle class="back" cx="17" cy="17" r="14"></circle>
        <circle class="front" cx="17" cy="17" r="14"></circle>
    </svg>
    <div class="text" data-text="Loading"></div>
</div></div>;
  }

  const data = [
    { goal: 'Cardiology', amount: 20 },
    { goal: 'Pediatrician', amount: 20 },
    { goal: 'Pediatrician', amount: 10 },
    { goal: 'Pediatrician', amount: 14 },
    { goal: 'Pediatrician', amount: 24 },
  ];

  const data1 = [
    { name: 'L1', value: 40 }
  ];

  const circleSize = 250;

  const data2 = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/Login');
  };

  return (
    <div className='profile'>
      <div className="profile-container">
        <div className="pic-container">

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
  style={{ display: 'none' }}
/>
          </label>

          <img src={profilePicture} className="profile-image" alt="Profile Picture" />
          <button type="button" className="uploadbut" onClick={uploadImage}>&#10004;</button>


          <div className="profile-details">
            <h1 className="Name">{userData.firstName} {userData.lastName}</h1>
            <div className="page-item">
              <span>Blood Group:</span>
              <span>A+</span>
            </div>
            <div className="page-item">
              <span>Height:</span>
              <span>150cm</span>
            </div>
            <div className="page-item">
              <span>Weight:</span>
              <span>60kg</span>
            </div>
            <div className="page-item">
              <span>Date of Birth:</span>
              <span>{userData.dateOfBirth.slice(0, 10)}</span>
            </div>
            <div className="page-item">
              <span>Contact No:</span>
              <span>{userData.mobileNumber}</span>
            </div>
            <div className="page-item">
              <span>Email:</span>
              <span>{userData.email}</span>
            </div>
            <div className="page-item">
              <span>Gender:</span>
              <span>Male</span>
            </div>
          </div>
        </div>

        <div className="combined-container">
          <div className="detials-container">
            <div className="page-item">
              <span>Blood pressure:</span>
              <span>80 mmHg</span>
            </div>
            <div className="page-item">
              <span>Breathing</span>
              <span>16 breaths/min</span>
            </div>
            <div className="page-item">
              <span>Pulse:</span>
              <span>72 beats/min</span>
            </div>
            <div className="page-item">
              <span>Temperature:</span>
              <span>97.8°F</span>
            </div>
          </div>
          <div className="reoprts-container">
            <div className="reprts-heading"><span>My Medical Reports</span></div>

            <Link to='/GeneralFiles'> <button type='submit' className='repot-button'>General Reports</button> </Link> 
            <Link to='/HeartFiles'> <button type='submit' className='repot-button'>Heart Related</button> </Link> 
            <Link to='/BrainFiles'> <button type='submit' className='repot-button'>Brain Related</button> </Link> 
            <Link to='/DiabeticFiles'> <button type='submit' className='repot-button'>Diabetics</button> </Link> 
            <Link to='/BfractureFiles'> <button type='submit' className='repot-button'>Bone fractures</button> </Link> 

          </div>
        </div>

        <div className="charts">
          <div className='barchart-container'>
            <div className="barchart-head"><span>Health Goals</span></div>
            <div className="barchart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart width={430} height={170} data={data} layout="vertical">
                  <XAxis type="number" orientation="top" stroke="#285A64" />
                  <YAxis type="category" dataKey="none" axisLine={false} dx={-5} tickLine={false} style={{ fill: "#4D9B98" }} />
                  <Bar background dataKey="amount" fill="#4D9B98" barSize={{ height: 26 }}>
                    <LabelList dataKey="goal" style={{ fill: "black" }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="piechart-container">
            <div className="piechart-head"><span>Health Goals</span></div>
            <div className="piechart">
              <ResponsiveContainer background="yellow">
                <RadialBarChart
                  width={circleSize}
                  height={circleSize}
                  cx={circleSize / 2}
                  cy={circleSize / 2}
                  innerRadius={100}
                  outerRadius={110}
                  barSize={10}
                  data={data1}
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    angleAxisId={0}
                    tick={false}
                  />
                  <RadialBar
                    background
                    clockWise
                    dataKey="value"
                    cornerRadius={circleSize / 2}
                    fill="#82ca9d"
                  />
                  <text
                    x={circleSize / 2}
                    y={circleSize / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="progress-label"
                  >
                    25
                  </text>
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>




      </div>

      <div className="linechart-container">
        <div className="linechart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={600} height={300} data={data2}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="profile-buttons">
        <div className="p-button" >
          <Link to='/FileUpload'>
            <button className="buttonupload">
              <svg class="svg-icon" width="24" viewBox="0 0 24 24" height="24" fill="none"><g stroke-width="2" stroke-linecap="round" stroke="#ffffff" fill-rule="evenodd" clip-rule="evenodd"><path d="m3 7h17c.5523 0 1 .44772 1 1v11c0 .5523-.4477 1-1 1h-16c-.55228 0-1-.4477-1-1z"></path><path d="m3 4.5c0-.27614.22386-.5.5-.5h6.29289c.13261 0 .25981.05268.35351.14645l2.8536 2.85355h-10z"></path></g></svg>
              <span className="labletext">Upload Files</span>
            </button>
          </Link>
        </div>
        <div className="p-button" >
          <button className="buttonlogout" onClick={handleLogout}>
            <span className="labletext">Logout</span>
          </button>
        </div>


      </div>

    </div>
  )
}

export default Profile;
