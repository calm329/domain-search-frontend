import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='w-full bg-[#2A323C] h-20 flex items-center px-8'>
      <Link to={'/'}>
      <h1 className='text-white text-2xl font-openSans'>Domain Search</h1>
      </Link>
    </header>
  )
}

export default Header
