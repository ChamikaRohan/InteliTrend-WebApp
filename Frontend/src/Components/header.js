import React, { useState, useEffect } from "react";
import Logo from "../Images/logo.png";
import "./header.css";
import { Link } from "react-router-dom";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [userType, setUserType] = useState(localStorage.getItem("userType")); // Default value of 1 for "Patient"

  const token = localStorage.getItem("token");

  // useEffect(() => {

  //   const utype = localStorage.getItem('userType');
  //   setUserType(utype)
  // }, [userType]);

  const handleUserTypeChange = (event) => {
    const selectedUserType = parseInt(event.target.value);
    setUserType(selectedUserType);
    localStorage.setItem("userType", selectedUserType);
  };

  return (
    <div>
      <nav className="header fixed top-0 w-full z-[999]">
        <Link to="/Home">
          <img src={Logo} alt="Logo" className="header-logo" />
        </Link>

        <button className="hamburger" onClick={() => setShowMenu(!showMenu)}>
          ☰
        </button>

        <ul className={`header-list ${showMenu ? "show-menu" : ""}`}>
          <div className="mydict">
            <div>
              {token ? (
                // Token is present, don't render the radio buttons
                <div></div>
              ) : (
                // Token is not present, render the radio buttons
                <div>
                  <label className="x">
                    <input
                      type="radio"
                      name="radio"
                      value="1"
                      checked={userType === 1}
                      onChange={handleUserTypeChange}
                    />
                    <span>Patient</span>
                  </label>
                  <label className="x">
                    <input
                      type="radio"
                      name="radio"
                      value="2"
                      checked={userType === 2}
                      onChange={handleUserTypeChange}
                    />
                    <span>Doctor</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          <Link to="/Doctors">
            <li className="header-list-item">Doctors</li>
          </Link>

          <Link to="/Services">
            <li className="header-list-item">Services</li>
          </Link>

          <Link to="/Aboutus">
            <li className="header-list-item">About Us</li>
          </Link>

          {token && userType == "2" ? (
            <Link to="/DocProfilePage">
              <li className="header-list-item">My Profile</li>
            </Link>
          ) : token ? (
            <Link to="/Dashboard">
              <li className="header-list-item">My Profile</li>
            </Link>
          ) : userType === "1" ? (
            <Link to="/Signup">
              <button className="signup-button">Sign Up</button>
            </Link>
          ) : (
            <Link to="/DocSignup">
              <button className="signup-button">Sign Up</button>
            </Link>
          )}
        </ul>
      </nav>
    </div>
  );
}
