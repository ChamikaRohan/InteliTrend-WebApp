import React from 'react';
import Header from '../../Components/header';
import Footer from '../../Components/Footer';
import GeneralCom from '../../Components/FilesComponents/Generalfiles';

export default function Dashboard() {
  return (
    <div>
      <Header/>
      <h1 className="hei"></h1>
      <GeneralCom/>
      <Footer/>
    </div>
  );
}
