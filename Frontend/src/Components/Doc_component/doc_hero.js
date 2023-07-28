import React from 'react';
import './doc_hero.css'; 
import { Link } from 'react-router-dom';

export default function Doc_hero() {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className='topic_doc'>Channel a Doctor Online!</h1>
        <Link to='/Login'>
        <button type="button" class="but">Click here to Login</button>
        </Link>
     
      </div>
    </div>
  )
}
