import React from 'react'
import Header from '../Components/header'
import Footer from '../Components/Footer'
import Doc_hero from '../Components/Doc_component/doc_hero'
import Search from '../Components/Doc_component/search'
import Services from '../Components/Doc_component/Services'

export default function Doctors() {
  return (
    <div>
        <Header/>
        <Doc_hero/>
        <Services/>
        <Footer/>
    </div>
  )
}
