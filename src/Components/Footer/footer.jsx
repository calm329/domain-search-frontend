import React from 'react';  

const Footer = () => {  
  return (  
    <footer className='h-auto w-full bg-[#1D1C28] flex flex-col items-center px-4 py-6 md:py-8 font-openSans'>  
      <ul className='flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-white text-sm md:text-lg'>  
        <li className='cursor-pointer'>Frequently Asked Questions</li>  
        <li className='cursor-pointer'>Terms of Service</li>  
        <li className='cursor-pointer'>Privacy Policy</li>  
      </ul>  
      <p className='text-neutral-300 text-center mt-4 md:mt-5'>Copyright © 2024 DomainInHand</p>  
    </footer>  
  );  
}  

export default Footer;