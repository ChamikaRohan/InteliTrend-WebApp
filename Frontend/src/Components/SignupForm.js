import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signupform.css'
import Image1 from '../Images/sign-up-form-image.jpg'
import {URL} from '../env'

function SignupForm() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        nic: '',
        email: '',
        dateOfBirth: '',
        mobileNumber: '',
        password: ''
    });

    const handleSubmit  = (event) => {
        event.preventDefault();
        console.log('Submitted: ',formData);
        try{
            axios.post(URL+'/register', formData);
            navigate('/Login');
        }
        catch(error){
            console.log(error);
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
                    <Link to='/Login'>
                    <button className='login-button-2'>LOG IN</button>
                    </Link>
                    
                </div>
                
                <div className="signup-heading">
                    <span>Sign Up to InteliTrend</span>
                    <p>Register your account</p>
                </div>

                <div className='sign-up-form'>
                    <form onSubmit={handleSubmit}>
                        <div className="item">
                            <div className='signup-item item-item'>
                                <label> First Name</label>
                                <input type='text' placeholder='Enter your first Name' id='firstName' name='firstName' onChange={handleInputChange}></input>
                            </div>

                            <div className='signup-item item-item'>
                                <label>Last Name</label>
                                <input type='text' placeholder='Enter your last Name' id='firstName' name='lastName' onChange={handleInputChange}></input>
                            </div>
                        </div>
                        
                        <div className="item">
                            <div className='signup-item item-item'>
                                <label>Date of Birth</label>
                                <input type='date' placeholder='Enter your birthday' id='birthday' name='dateOfBirth' onChange={handleInputChange}></input>
                            </div>

                            <div className='signup-item item-item'>
                                <label>NIC</label>
                                <input type='text' placeholder='Enter your NIC number' id='NIC' name='nic' onChange={handleInputChange}></input>
                            </div>
                        </div>

                        <div className="item">
                            <div className='signup-item item-item'>
                                <label>Email</label>
                                <input type='email' placeholder='Enter your email address' id='email' name='email' onChange={handleInputChange}></input>
                            </div>

                            <div className='signup-item item-item'>
                                <label>Mobile Number</label>
                                <input type='mobile' placeholder='Enter your mobile number' id='mobile' name='mobileNumber' onChange={handleInputChange}></input>
                            </div>
                        </div>



                        <div className='signup-item'>
                            <label>Password</label>
                            <input type='password' placeholder='**************' id='password' name='password' onChange={handleInputChange}></input>
                        </div>

                        <div className='signup-item'>
                            <label>Confirm Password</label>
                            <input type='confirm-password' placeholder='**************' id='confirm-password' name='confirm-password'></input>
                        </div>

                    <button type='submit' className='sign-up-button'>SUBMIT</button>

                    </form>
                </div>      

            </div>
        </div>
    </div>
  )
}

export default SignupForm;
