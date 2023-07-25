import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signupform.css'
import Image1 from '../Images/sign-up-form-image.jpg'
import {URL} from '../env'

function Doc_Signup() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        docname: '',
        dob: '',
        nic: '',
        email: '',
        phone: '',
        workingHospital: '',
        speciality: '',
        experience: '',
        gmoaRegNum: '',
        password: ''
    });

    const handleSubmit  = (event) => {
        event.preventDefault();
        console.log('Submitted: ',formData);
        try{
            axios.post(URL+'/doctor', formData);
            navigate('/DocLogin');
        }
        catch(error){
            console.log('error', error);
        }
        };

    const handleInputChange = (event)=>{
        const { name, value} = event.target;
        setFormData({...formData, [name]:value});
    }

  return (
    <div>
        <div className='signup-container'>
            <div className="image-container">
                <img className='signup-container-image' src={Image1}></img>
            </div>
            
            <div className='form-container'>
                <div className='login-link'>
                    <p>Already have an account?</p>
                    <Link to='/DocLogin'>
                    <button className='login-button-2'>LOG IN</button>
                    </Link>
                    
                </div>
                
                <div className="signup-heading">
                    <span>Sign Up to InteliTrend</span>
                    <p>Register as a doctor</p>
                </div>

                <div className='sign-up-form'>
                    <form onSubmit={handleSubmit}>

                        <div className="item">
                            <div className='signup-item item-item'>
                                <label>Name</label>
                                <input type='text' placeholder='Enter your Name' id='firstName' name='docname' onChange={handleInputChange}></input>
                            </div>

                            <div className='signup-item item-item'>
                                <label>Date of Birth</label>
                                <input type='date' placeholder='Enter your Date of Birth' id='firstName' name='dob' onChange={handleInputChange}></input>
                            </div>
                        </div>
                        
                        <div className="item">
                            <div className='signup-item item-item'>
                                <label>NIC</label>
                                <input type='text' placeholder='Enter your NIC' id='birthday' name='nic' onChange={handleInputChange}></input>
                            </div>

                            <div className='signup-item item-item'>
                                <label>Email</label>
                                <input type='text' placeholder='Enter your Email' id='NIC' name='email' onChange={handleInputChange}></input>
                            </div>
                        </div>


                        <div className="item">
                            <div className='signup-item item-item'>
                                <label>Mobile Number</label>
                                <input type='mobile' placeholder='Enter your Mobile Number' id='email' name='phone' onChange={handleInputChange}></input>
                            </div>

                            <div className='signup-item item-item'>
                                <label>Working Hospital</label>
                                <input type='text' placeholder='Enter your Working Hospital' id='mobile' name='workingHospital' onChange={handleInputChange}></input>
                            </div>
                        </div>

                        <div className="item">

                        <div className='signup-item item-item'>
                                <label>Speciality</label>
                                <input type='text' placeholder='Enter your Speciality' id='NIC' name='speciality' onChange={handleInputChange}></input>
                            </div>

                            <div className='signup-item item-item'>
                                <label>Experience</label>
                                <input type='text' placeholder='Enter your Experience' id='birthday' name='experience' onChange={handleInputChange}></input>
                            </div>
                        </div>

                        <div className='signup-item'>
                                <label>GMOA Reg No</label>
                                <input type='number' placeholder='Enter your GMOA Reg No' id='birthday' name='gmoaRegNum' onChange={handleInputChange}></input>
                        </div>

                        <div className="item">

                          <div className='signup-item item-item'>
                                  <label>Password</label>
                                  <input type='password' placeholder='Enter your Password' id='password' name='password' onChange={handleInputChange}></input>
                              </div>

                              <div className='signup-item item-item'>
                                  <label>Confirm Password</label>
                                  <input type='password' placeholder='Enter your Password Again' id='confirm-password' name='confirm-password'></input>
                              </div>
                        </div>

                    <button type='submit' className='sign-up-button'>SUBMIT</button>
                    </form>
                </div>
                

            </div>
        </div>
    </div>
  )
}

export default Doc_Signup;
