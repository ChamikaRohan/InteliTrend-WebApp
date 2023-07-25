import React from 'react';
import Header from '../../Components/header';
import Footer from '../../Components/Footer';
import BoneCom from '../../Components/FilesComponents/Bonefracturefiles';

export default function Dashboard() {
  return (
    <div>
      <Header/>
      <BoneCom/>
      <Footer/>
    </div>
  );
}
