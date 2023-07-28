import React, { useState } from "react";
import ChannelingImg from "../Images/chaneling.jpg";
import SecurityImg from "../Images/data-security.jpg";
import Documentation from "../Images/documentation.jpg";
import MobileImg from "../Images/mobile.jpg";
import Profile from "../Images/profile.jpg";
import "./services.css";

export default function Services() {
  const [showPopupchanneling, setshowPopupchanneling] = useState(false);
  const [showPopupSecurity, setShowPopupSecurity] = useState(false);
  const [showPopupData, setShowPopupData] = useState(false);
  const [showPopupDocumentation, setShowPopupDocumentation] = useState(false);
  const [showPopupProfile, setShowPopupProfile] = useState(false);

  const togglePopupchanneling = () => {
    setshowPopupchanneling(!showPopupchanneling);
  };

  const togglePopupSecurity = () => {
    setShowPopupSecurity(!showPopupSecurity);
  };

  const togglePopupData = () => {
    setShowPopupData(!showPopupData);
  };

  const togglePopupDocumentation = () => {
    setShowPopupDocumentation(!showPopupDocumentation);
  };

  const togglePopupProfile = () => {
    setShowPopupProfile(!showPopupProfile);
  };

  const togglePopup3 = () => {
    setShowPopupSecurity(!showPopupSecurity);
  };

  return (
    <div className="popup-container">
    <h1>What You Can Get With Us?</h1>
      <div className="columns">
        <div className="card" onClick={togglePopupchanneling}>
          <img src={ChannelingImg} />
          <div className="card-content">
            <h3>Doctor Channeling</h3>
            <button>Learn More</button>
          </div>
        </div>

        <div className="card" onClick={togglePopupSecurity}>
          <img src={SecurityImg} />
          <div className="card-content">
            <h3>Data Security</h3>
            <button>Learn More</button>
          </div>
        </div>

        <div className="card" onClick={togglePopupData}>
          <img src={MobileImg} />
          <div className="card-content">
            <h3>User Friendly experience</h3>
            <button>Learn More</button>
          </div>
        </div>
      </div>

      <div className="columns">
        <div className="card" onClick={togglePopupDocumentation}>
          <img src={Documentation} alt="Service Title" />
          <div className="card-content">
            <h3>Health Record</h3>
            <button>Learn More</button>
          </div>
        </div>

        <div className="card" onClick={togglePopupProfile}>
          <img src={Profile} alt="Service Title" />
          <div className="card-content">
            <h3>Health Profile</h3>
            <button>Learn More</button>
          </div>
        </div>

        <div className="card" onClick={togglePopup3}>
          <img src={SecurityImg} alt="Service Title" />
          <div className="card-content">
            <h3>Proper Documentation</h3>
            <button>Learn More</button>
          </div>
        </div>
      </div>

      {showPopupchanneling && (
        <div className="popup">
          <div className="popup-content">
            <h2>Doctor Channeling</h2>
            <p>
              With our doctor channeling service, you can skip the hassle of
              physically going to a clinic and waiting in line to see a doctor.
              Our platform connects you with a wide range of experienced and
              qualified doctors who are available to consult with you online.
              Whether you need to discuss a medical concern, get a prescription,
              or receive a referral to a specialist, our doctor channeling
              service is here to help.
            </p>
            <p>
              Our platform provides a user-friendly interface, making it easy to
              search for doctors based on specialty, location, and availability.
              You can easily book an appointment with your preferred doctor and
              choose a convenient time that works for you. We also provide
              secure payment options, ensuring that your personal and financial
              information is protected.
            </p>
            <p>
              Our doctor channeling service is designed to provide you with a
              hassle-free experience and the medical attention you need, when
              you need it. Book your appointment today and take the first step
              towards better health.
            </p>
            <button onClick={togglePopupchanneling}>Close</button>
          </div>
        </div>
      )}

      {showPopupSecurity && (
        <div className="popup">
          <div className="popup-content">
            <h2>Data Security</h2>
            <p>
              Our website takes several measures to ensure that all patient data
              is safe and secure. This includes using firewalls, intrusion
              detection systems, and other advanced security technologies to
              protect against unauthorized access, data breaches, and cyber
              attacks. We also perform regular security audits to identify and
              address any vulnerabilities in our system.
            </p>
            <p>
              In addition to technical measures, we also have strict policies
              and procedures in place to ensure that all staff members are aware
              of the importance of data security and are trained to handle
              patient data with the utmost care. We also require all third-party
              vendors and partners to comply with our strict data security
              policies and procedures.
            </p>
            <p>
              At our website, we are committed to maintaining the highest
              standards of data security to ensure that our patients'
              confidential information is always kept safe and secure.
            </p>
            <button onClick={togglePopupSecurity}>Close</button>
          </div>
        </div>
      )}

      {showPopupData && (
        <div className="popup">
          <div className="popup-content">
            <h2>User Friendly experience</h2>
            <p>
              We understand that a user-friendly interface is critical for a
              seamless experience, which is why we have designed our website to
              be intuitive and easy to use. Our goal is to provide a hassle-free
              experience to all our users, regardless of their technical
              expertise. From booking appointments to managing health records,
              our website is designed to make the process as smooth as possible.
            </p>
            <h4>Mobile App</h4>
            <p>
              To provide the ultimate convenience to our patients, we have
              developed a mobile app that allows them to manage their health
              records from their phones. With the app, patients can easily
              schedule appointments, access medical records, and receive
              reminders for upcoming appointments. The app is available for both
              iOS and Android, and can be downloaded from the App Store or
              Google Play. With our mobile app, managing your health has never
              been easier!
            </p>
            <button onClick={togglePopupData}>Close</button>
          </div>
        </div>
      )}

      {showPopupDocumentation && (
        <div className="popup">
          <div className="popup-content">
            <h2>Documentation</h2>
            <p>
              Our platform offers patients the ability to store and organize
              their health records in a centralized and secure location.
              Patients can easily upload their medical documents such as x-rays,
              lab results, and prescriptions as photos or PDF files. These
              documents can be accessed anytime, anywhere, and from any device
              with an internet connection. By providing this feature, we aim to
              simplify the process of maintaining health records and make it
              easier for patients to keep track of their medical history. Our
              platform also allows patients to share their medical documents
              with their healthcare providers securely, eliminating the need for
              physical copies and minimizing the risk of loss or misplacement.
            </p>
            <p>
              We understand that managing medical documents can be overwhelming,
              and it's easy to lose track of important information. Therefore,
              we've developed a user-friendly interface that simplifies the
              process of adding and managing medical documents. Our platform
              makes it easy for patients to upload and categorize their
              documents, view their medical history, and set reminders for
              appointments and medication refills. Additionally, patients can
              download their health records at any time, providing them with
              complete control over their data. With our platform, patients can
              manage their health records with ease, and healthcare providers
              can access up-to-date and comprehensive patient information,
              ensuring quality care delivery.
            </p>
            <button onClick={togglePopupDocumentation}>Close</button>
          </div>
        </div>
      )}

        {showPopupProfile && (
        <div className="popup">
          <div className="popup-content">
            <h2>Health Profile</h2>
            <p>
            In addition to maintaining their health records, users of our website can also create and manage their own health profile. This feature allows users to track their health data over time and provides an easy way to share important information with their doctors. Users can include information such as their medical history, allergies, medications, and health goals in their profile. They can also choose to share this information with specific doctors when scheduling appointments through our platform
            </p>
            <p>
            By having a comprehensive health profile, users can have more informed discussions with their doctors and receive more personalized care. Additionally, having access to their health data in one place can help users make more informed decisions about their own health and wellness. Overall, our health profile feature helps to empower users to take charge of their own health and improve their healthcare experience.
            </p>
            <button onClick={togglePopupProfile}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
