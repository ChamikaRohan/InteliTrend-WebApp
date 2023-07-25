import React from 'react'
import Footer from '../Components/Footer'
import Hero1 from '../Components/hero1'
import Section1 from '../Components/section1'
import Section2 from '../Components/Section2_categories'
import Header from '../Components/header'

export default function Home() {
  return (
    <div>
        <Header/>
        <Hero1/>
        <Section1/>
        <Section2/>
        <Footer/>
    </div>
  )
}
