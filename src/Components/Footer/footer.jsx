import React from 'react'

const Footer = () => {
  return (
    <footer className='h-[25vh] w-full bg-[#1D1C28] flex flex-col gap-4 px-8 justify-center font-openSans'>
      <ul className='flex items-center justify-center gap-8 text-white text-lg '>
        <li className='cursor-pointer'>Find A Domain</li>
        <li className='cursor-pointer'>Frequently Asked Questions</li>
        <li className='cursor-pointer'>Terms of Service</li>
        <li className='cursor-pointer'>Privacy Policy</li>
        <li className='cursor-pointer'>Press</li>
      </ul>

      <p className='text-neutral-300 text-center mt-5'>Copyright © 2024 Domain In Hand</p>
    </footer>
  )
}

export default Footer
