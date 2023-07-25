import React from 'react';
import Header from '../../Components/header';
import Footer from '../../Components/Footer';
import BrainCom from '../../Components/FilesComponents/Brainfiles';

export default function Dashboard() {
  return (
    <div>
      <Header/>
      <BrainCom/>
      <Footer/>
    </div>
  );
}
