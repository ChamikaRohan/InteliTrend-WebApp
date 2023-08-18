import React, { useState } from 'react';
import './fileUploadCom.css'
import axios from 'axios';
import {URL} from '../env';
import DatePicker from 'react-datepicker'; // Import the DatePicker component
import 'react-datepicker/dist/react-datepicker.css'; // Import the DatePicker styles

function FileUploadCom() {

  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const[image,setImage]=useState("");
  var catogorystring =null;
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleFileUpload = (event) => {
    switch (category) {
        case '10':
          catogorystring = 'general';
        break;
        case '20':
            catogorystring = 'heart';
          break;
        case '30':
            catogorystring = 'brain';
          break;
        case '40':
            catogorystring = 'diabetics';
          break;
        case '50':
            catogorystring = 'bonefractures';
        break;
        case '60':
            catogorystring = 'other';
      }
      const formData = new FormData();
      formData.append('doc', file);
  
      const token = localStorage.getItem('token');
  
      axios
        .post(URL+'/upload-doce', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            type: catogorystring
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
  

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  // Handler for date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

    
    

  return (
    <div>
        <div className="upload-container">
            <div className="upload-heading">
                <span>Upload Your Document</span>
            </div>
            <div className="upload-items">
                {/* <div className="upload-doc">
                    <input type="text" placeholder='Drag & Drop file OR' id='upload-file' name='upload-file'></input>
                </div> */}

                <div class="container">
                    <div class="header-1">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                            d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
                            stroke="#000000"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            ></path>{" "}
                        </g>
                        </svg>{" "}
                        <label className="topicfile">Select a file to upload:</label>

                        <label for="file-input" class="choose-file-button">
                            <svg
                              class="icon"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M12 3v18m-9-9h18"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            Choose File
                            <input id="file-input" type="file" onChange={handleFileInputChange}/>
                          </label>

                        <button className="button" onClick={handleFileUpload}>
                        <svg class="svg-icon" width="24" viewBox="0 0 24 24" height="24" fill="none"><g stroke-width="2" stroke-linecap="round" stroke="#ffffff" fill-rule="evenodd" clip-rule="evenodd"><path d="m3 7h17c.5523 0 1 .44772 1 1v11c0 .5523-.4477 1-1 1h-16c-.55228 0-1-.4477-1-1z"></path><path d="m3 4.5c0-.27614.22386-.5.5-.5h6.29289c.13261 0 .25981.05268.35351.14645l2.8536 2.85355h-10z"></path></g></svg>
                        <span className="lable">Upload Files</span>
                        </button>
                    </div>
                    
                    <input id="file" type="file" />
                    </div>

                <div className="upload-details">
                    <div className="details-item">
                        <label>Date: </label>
                        <DatePicker
                          selected={selectedDate}
                          onChange={handleDateChange}
                          placeholderText="Select a date" // Placeholder text when no date is selected
                        />
                   </div>
                    <div className="details-item">
                        <label>Select Category: </label>
                        <select value={category} onChange={handleCategoryChange}>
                            <option value="">Select a category</option>
                            <option value="10">General Reports</option>
                            <option value="20">Heart Related</option>
                            <option value="30">Brain Related</option>
                            <option value="40">Diabetics</option>
                            <option value="50">Bone fractures</option>
                            <option value="60">Other Category</option>
                        </select>
                        {/* <input type='text' placeholder=''></input> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FileUploadCom;