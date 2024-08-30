import React from 'react'
import HomeSection from './Home'
import Footer from '../Components/Footer/footer'

const Main_Page = () => {
  return (
    <div className='min-h-screen bg-[#0D0D15] flex flex-col'>
      <HomeSection />
      <Footer />
    </div>
  )
}

export default Main_Page
