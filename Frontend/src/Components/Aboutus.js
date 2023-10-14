import React from "react";
import Dilshara from '../Images/Dilshara.jpg';
import Chinthaka from '../Images/Chinthaka.jpg';
import Pasindu from '../Images/Pasindu.jpg';
import Chamika from '../Images/Chamika.jpeg';

function Aboutus() {
  return (
    <div className="aboutus font-raleway mt-10 pt-24">
      <h1 className="text-3xl text-center my-5">Who are we?</h1>

      <div className="flex flex-col md:flex-row justify-between px-5 md:px-20 lg:px-32">
        <p className="text-base md:text-lg text-justify my-3">
          InteliTrend is a healthcare technology company founded by a team of passionate professionals with a vision to improve the quality of patient care through innovative solutions. The founders of the company are Chamika Rohan, Pasindu Pamuditha, Chinthaka Abeyrathne, and Dilshara Herath.
          As a team, we believe that technology can transform healthcare and make a positive impact on the lives of patients. We have developed a secure and reliable platform that enables healthcare providers to easily store and access patient health records, while also ensuring patient privacy and security. Our user-friendly platform is designed to make it easy for patients to manage their health records and communicate with their healthcare providers.
          At InteliTrend, we are committed to our mission of improving patient care through innovative technology. Our goal is to empower healthcare providers and patients with the tools they need to make informed decisions and manage health more effectively.
          Join us on our journey to transform healthcare through technology.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center text-center px-5 md:px-20 lg:px-32 my-10">
        <div className="founder-card md:mx-4 my-4">
          <img src={Dilshara} alt="Dilshara Herath" className="w-40 h-40 rounded-full object-cover mx-auto" />
          <p className="text-lg font-semibold mt-2">Dilshara Herath</p>
          <p className="text-sm">Co-founder of InteliTrend</p>
          <p className="text-sm">Project Manager at InteliTrend</p>
        </div>

        <div className="founder-card md:mx-4 my-4">
          <img src={Chinthaka} alt="Chinthaka Abeyrathne" className="w-40 h-40 rounded-full object-cover mx-auto" />
          <p className="text-lg font-semibold mt-2">Chinthaka Abeyrathne</p>
          <p className="text-sm">Co-founder of InteliTrend</p>
          <p className="text-sm">Front-end Developer at InteliTrend</p>
        </div>

        <div className="founder-card md:mx-4 my-4">
          <img src={Chamika} alt="Chamika Rohan" className="w-40 h-40 rounded-full object-cover mx-auto" />
          <p className="text-lg font-semibold mt-2">Chamika Rohan</p>
          <p className="text-sm">Co-founder of InteliTrend</p>
          <p className="text-sm">Back-end Developer at InteliTrend</p>
        </div>

        <div className="founder-card md:mx-4 my-4">
          <img src={Pasindu} alt="Pasindu Pamuditha" className="w-40 h-40 rounded-full object-cover mx-auto" />
          <p className="text-lg font-semibold mt-2">Pasindu Pamuditha</p>
          <p className="text-sm">Co-founder of InteliTrend</p>
          <p className="text-sm">UX/UI Designer at InteliTrend</p>
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
