import React from 'react';
import Header from '../../Components/header';
import Footer from '../../Components/Footer';
import HeartCom from '../../Components/FilesComponents/Heartfiles';

export default function Dashboard() {
  return (
    <div>
      <Header/>
      <HeartCom/>
      <Footer/>
    </div>
  );
}
