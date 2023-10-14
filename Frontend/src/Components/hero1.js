import React from "react";
import Image1 from "../Images/HeroImage.png";
import { Link } from "react-router-dom";

class Hero1 extends React.Component {
  render() {
    return (
      <div className="hero bg-[#00706c] pt-24  text-white p-10">
        <p className="hero2 text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center py-4 px-6 md:py-10 md:px-4">
          The only web-based technology <br /> platform for your health profile
        </p>

        <div className="flex flex-col md:flex-row lg:flex-row">
          <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 text-lg md:text-xl lg:text-xl xl:text-2xl px-6 md:px-4 text-justify">
            <p>
              InteleTrend is an established provider of electronic health record
              (EHR) management solutions. Their user-friendly and customizable management services are designed to help healthcare providers patient care and comply with regulatory requirements.
            </p>
            <div className="buttonsDiv pt-5 flex space-x-3 flex-col md:flex-row justify-center items-center">
              <Link to="/Signup">
                <button className="my-2 bg-orange-500 px-4 py-2 text-white hover:bg-orange-400 hover:scale-105 transform transition duration-500 rounded-full">
                  Join Us
                </button>
              </Link>

              <Link to="/Aboutus">
                <button className="my-2 bg-orange-500 px-4 py-2 text-white hover:bg-orange-400 hover:scale-105 transform transition duration-500 rounded-full">
                  More Info
                </button>
              </Link>
            </div>
          </div>
          <img className="hero1_image1 justify-center w-full md:w-1/3 lg:w-1/3 xl:w-1/3 mt-5 md:mt-0 animate-pulse" alt="" src={Image1}></img>
        </div>
      </div>
    );
  }
}

export default Hero1;
