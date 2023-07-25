import React from 'react'
import './footer.css';
import logo from '../Images/logo.png'

export default function Footer() {
  return (
    <div className='footermain'>
        <div className="con12">
            <div className="con1">
                <h3 className="footh3">Tel</h3>
                <h4 className="footh4">(071)-6868110</h4>
                <h3 className="footh3">Fax</h3>
                <h4 className="footh4">(508) 836-4466</h4>
            </div>
            <div className="con2">
                <h3 className="footh3">Head Office:</h3>
                <h4 className="footh4">No. 35, Dharmapala Mawatha,<br></br> Colombo 03, Sri Lanka.</h4>
                <h3 className="footh3">Support</h3>
                <h4 className="footh4">support@inteletrend.lk</h4>
            </div>
            
        </div>


   
        <img className="logoImage" src={logo}></img>

        
        <div className="footersec2">
            <a className='footerbuttons' href="#Help & FAQ">Help & FAQ</a>
            <a className='footerbuttons' href="#Terms of Use">Terms of Use</a>
            <a className='footerbuttons' href="#Privacy Policy">Privacy Policy</a>
        </div>

        <p className="parafooter">© 2023 inteletrend.lk. All Rights Reserved.</p>
    </div>
  )
}
