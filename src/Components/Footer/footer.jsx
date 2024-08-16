import React from 'react'

const Footer = () => {
  return (
    <footer className='h-[25vh] w-full bg-[#1D1C28] flex flex-col gap-4 px-8 justify-center font-openSans'>
            <ul className='flex items-center gap-8 text-white text-lg '>
                <li>Find A Domain</li>
                <li>Frequently Asked Questions</li>
            </ul>
            <ul className='flex items-center gap-8 text-white text-lg '>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Press</li>
            </ul>
    </footer>
  )
}

export default Footer
