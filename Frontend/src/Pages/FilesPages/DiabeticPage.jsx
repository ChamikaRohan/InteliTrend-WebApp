import React from 'react';
import Header from '../../Components/header';
import Footer from '../../Components/Footer';
import DiabeticCom from '../../Components/FilesComponents/Diabetics';

export default function Dashboard() {
  return (
    <div>
      <Header/>
      <DiabeticCom/>
      <Footer/>
    </div>
  );
}
