import React from "react";
import "./hero1.css";
import Image1 from "../Images/HeroImage.png";
import { Button, Navbar, Container } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';

class Hero1 extends React.Component {
  render() {
    return (
      <div class="hero">
        <p className="hero2">
          The only web based technology <br></br> platform for your health
          profile
        </p>
        <div class="aboutpage">
          <div>
            <p>
              InteleTrend is an established provider of electronic health record
              (EHR)
            </p>
            <p>
              {" "}
              management solutions. Their user-friendly and customizable EHR
            </p>
            <p>
              {" "}
              management services are designed to help healthcare providers
              improve
            </p>
            <p> patient care and comply with regulatory requirements.</p>
            <div className="buttonsDiv">
              <Link to='/Signup'>
                <button class="JoinUs_button">Join Us</button>
              </Link>

              <Link to='/Aboutus'>
                <button class="moreinfo_button">More Info</button>
              </Link>

            </div>
          </div>
          <img className="hero1_image1" alt="" src={Image1}></img>
        </div>
      </div>
    );
  }
}

export default Hero1;
