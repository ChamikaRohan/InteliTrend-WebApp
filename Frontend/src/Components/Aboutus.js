import React from "react";
import './aboutus.css';
import Dilshara from '../Images/Dilshara.jpg'
import Chinthaka from '../Images/Chinthaka.jpg'
import Pasindu from '../Images/Pasindu.jpg'
import Chamika from '../Images/Chamika.jpeg'

export default function Aboutus() {
  return (
    <div className="aboutus">
      <h1 className="Head">Who are we?</h1>
      <div className="aboutus-container-1">
        <p className="aboutus-para">
          InteliTrend is a healthcare technology company founded by a team of
          passionate professionals with a vision to improve the quality of
          patient care through innovative solutions. The founders of the company
          are Chamika Rohan, Pasindu Pamuditha, Chinthaka Abeyrathne, and
          Dilshara Herath.
        </p>

        <p className="aboutus-para">
          As a team, we believe that technology can transform healthcare and
          make a positive impact on the lives of patients. We have developed a
          secure and reliable platform that enables healthcare providers to
          easily store and access patient health records, while also ensuring
          patient privacy and security. Our user-friendly platform is designed
          to make it easy for patients to manage their health records and
          communicate with their healthcare providers.
        </p>

        <p className="aboutus-para">
          At InteliTrend, we are committed to our mission of improving patient
          care through innovative technology. Our goal is to empower healthcare
          providers and patients with the tools they need to make informed
          decisions and manage health more effectively.
        </p>

        <p className="aboutus-para">
          Join us on our journey to transform healthcare through technology...
        </p>
      </div>
      <div className="aboutus-container-2">
          <div className="founders">
              <img className="aboutus-img" src={Dilshara} />
              <p><span>Dilshara Herath</span></p>
              <p>Co-founder of InteliTrend</p>
              <p>Project Manager at InteliTrend</p>
          </div>
          <div className="founders">
              <img className="aboutus-img" src={Chinthaka} />
              <p><span>Chinthaka Abeyrathne</span></p>
              <p>Co-founder of InteliTrend</p>
              <p>Front-end Developer at InteliTrend</p>
          </div>
          <div className="founders">
              <img className="aboutus-img" src={Chamika} />
              <p><span>Chamika Rohan</span></p>
              <p>Co-founder of InteliTrend</p>
              <p>Back-end Developer at InteliTrend</p>
          </div>
          <div className="founders">
              <img className="aboutus-img" src={Pasindu} />
              <p><span>Pasindu Pamuditha</span></p>
              <p>Co-founder of InteliTrend</p>
              <p>UX/UI Designer at InteliTrend</p>
          </div>
      </div>
    </div>
  );
}
