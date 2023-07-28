import React from 'react';
import './section1.css';
import Image1 from '../Images/se1.png'
import Image2 from '../Images/se2.png'
import Image3 from '../Images/se3.png'

class Section1 extends React.Component {
  render() {
    return (
        <div className='section_1'>
          <h2 className='products'>Why InteliTrend</h2>
           <div className='container_section1'>

           <div className='con_sec'>
              <img className="sec1_image1" alt='' src={Image1}></img>
              <h3 className='sec_1_text'>Designed to be friendly,flexible</h3>
              <p className='para_text'> The platform is user-friendly and customizable, enabling patients to take control of their healthcare and securely share their health information with their healthcare providers.</p>
            </div>

            <div className='con_sec'>
              <img className="sec1_image1" alt=''  src={Image2}></img>
              <h3 className='sec_1_text'>Easily Manage Health Records</h3>
              <p className='para_text'>InteleTrend's patient-facing platform enables patients to easily manage their health documents and track their health history. Patients can quickly access and review their health records</p>
            </div>

            <div className='con_sec'>
              <img className="sec1_image1" alt=''  src={Image3}></img>
              <h3 className='sec_1_text'>Securely Share HealthInformation</h3>
              <p className='para_text'>InteleTrend's platform enables patients to securely share their health information with their healthcare providers.Patients can quickly access and review their health records</p>
            </div>

           </div>
        </div>
        
    );
  }
}

export default Section1;