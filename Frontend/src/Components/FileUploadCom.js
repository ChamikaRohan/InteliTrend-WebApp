import React, { useState, useEffect } from 'react';
import './fileUploadCom.css';
import axios from 'axios';
import { URL } from '../env';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function FileUploadCom() {
    const [category, setCategory] = useState('');
    const [file, setFile] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null); // State for selected date
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator

    const handleFileInputChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async (event) => {
        let catogorystring = '';

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
                break;
        }

        const formData = new FormData();
        formData.append('doc', file);

        const token = localStorage.getItem('token');

        // Set loading indicator to true
        setIsLoading(true);

        try {
            const response = await axios.post(URL + '/upload-doce', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    type: catogorystring,
                },
            });

            console.log(response.data.msg);
            setSuccessMessage('File successfully uploaded!');

            // Automatically remove success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error(error);
        } finally {
            // Set loading indicator to false after upload is complete (success or failure)
            setIsLoading(false);
        }
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

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
                    <div class="container">
                        <div class="header-1">
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
                                <input id="file-input" type="file" onChange={handleFileInputChange} />
                            </label>
                            <button className="button" onClick={handleFileUpload} disabled={isLoading}>
                                {isLoading ? (
                                    <div>Loading...</div>
                                ) : (
                                    <>
                                        <svg class="svg-icon" width="24" viewBox="0 0 24 24" height="24" fill="none">
                                            <g stroke-width="2" stroke-linecap="round" stroke="#ffffff" fill-rule="evenodd" clip-rule="evenodd">
                                                <path d="m3 7h17c.5523 0 1 .44772 1 1v11c0 .5523-.4477 1-1 1h-16c-.55228 0-1-.4477-1-1z"></path>
                                                <path d="m3 4.5c0-.27614.22386-.5.5-.5h6.29289c.13261 0 .25981.05268.35351.14645l2.8536 2.85355h-10z"></path>
                                            </g>
                                        </svg>
                                        <span className="lable">Upload Files</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="upload-details">
                        <div className="details-item">
                            <label>Date: </label>
                            <DatePicker
                              selected={selectedDate}
                              onChange={handleDateChange}
                              placeholderText="Select a date"
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
                        </div>
                    </div>

                    {successMessage && <div className="success_message">{successMessage}</div>}
                </div>
            </div>
        </div>
    );
}

export default FileUploadCom;
