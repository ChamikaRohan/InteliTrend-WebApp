import React from 'react'
import './footer.css';
import Facebook from '../Images/facebook_.png'
import Instagram from '../Images/instagram_.png'
import Linkedin from '../Images/linkedin.png'
import Twitter from '../Images/twitter.png'
import Logo from '../Images/logo.png';
import { Link } from "react-router-dom";


export default function Footer() {
  return <footer className='bg-[#00706c] text-white'>
    

    <div className="grid grid-cols-1 items-center justify-center sm:grid-cols-1 text-center lg:grid-cols-3 gap-6 sm:px-8 px-5 pt-16 pb-7">
        <ul>
        <img src={Logo} alt="" />
        <p className='text-bold text-xl'>IntelliTrend Health Service</p>
        <p className='pt-5 text-gray-400'>No.35, Kotugodalla Road, <br />
        Colombo 07, <br />
        Sri Lanka.</p>

        </ul>
        <ul>
          
        <Link to='/Home'><li className="text-black hover:text-orange-500 duration-300 text-xl cursor-pointer leading-10">Home</li></Link>
        <Link to='/Doctors'><li className="text-black hover:text-orange-500 duration-300 text-xl cursor-pointer leading-10">Doctors</li></Link>
        <Link to='/Services'><li className="text-black hover:text-orange-500 duration-300 text-xl cursor-pointer leading-10">Services</li></Link>
        <Link to='/Aboutus'><li className="text-black hover:text-orange-500 duration-300 text-xl cursor-pointer leading-10">About Us</li></Link>
        <Link to='/DocProfilePage'><li className="text-black hover:text-orange-500 duration-300 text-xl cursor-pointer leading-10">My Profile</li></Link>

        </ul>
        <ul className='flex flex-col justify-center items-center'>

        <li>
          <a href="https://web.facebook.com/MedicalDaily" target="_blank" rel="noopener noreferrer">
            <img src={Facebook} alt="" className='w-10 h-10 cursor-pointer leading-6 p-1 hover:scale-105 transform transition duration-500 ' />
          </a>
        </li>

        <li>
          <a href="https://www.instagram.com/medical.doctors/" target="_blank" rel="noopener noreferrer">
          <li><img src={Instagram} alt="" className='w-10 h-10 cursor-pointer leading-6 p-1 hover:scale-105 transform transition duration-500 ' /></li>
          </a>
        </li>

        <li>
          <a href="https://www.linkedin.com/groups/2119455/" target="_blank" rel="noopener noreferrer">
          <li><img src={Linkedin} alt="" className='w-10 h-10 cursor-pointer leading-6 p-1 hover:scale-105 transform transition duration-500 ' /></li>
          </a>
        </li>

        <li>
          <a href="https://twitter.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJsYW5nIjoiZW4ifQ%3D%3D%22%7D" target="_blank" rel="noopener noreferrer">
          <li><img src={Twitter} alt="" className='w-10 h-10 cursor-pointer leading-6 p-1 hover:scale-105 transform transition duration-500 ' /></li>
          </a>
        </li>
          
        </ul>
    </div>


    <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 text-gray-100 gap-10 text-center pt-2 text-sm pb-8'>
      <span>All rights reserved @2023</span>
    </div>
  </footer>;
};
