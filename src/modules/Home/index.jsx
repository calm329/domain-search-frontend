import React, { useState } from 'react'
import serachIcon from '../../assets/search.svg'
import { Link, useNavigate } from 'react-router-dom'

const Home_Section = () => {

  const keywords = [
    'app', 'blog', 'coffee', 'dating', 'fly', 'football', 'fun', 'game', 'gym', "help", 'iphone', 'mail', 'news', 'note', 'party', 'photo', 'pic', 'running', 'scifi', 'seo', 'shopping', 'sports', 'startup', 'stock', 'store', 'sushi', 'todo', 'web', 'world', 'yoga',
  ]

  const [domain, setDomain] = useState('')
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${encodeURIComponent(searchTerm.trim())}`);
    }
  };


  return (
    <section className='w-full h-[75vh] font-openSans flex justify-center items-center flex-col gap-16 opensans bg-[#0D0D15]'>

      {/* Website Name */}
      <h1 className='text-3xl md:text-5xl uppercase font-semibold text-white'>Domain <span className='text-[#6feec7]'>Search</span></h1>

      {/* Search_box */}

      <div className='w-[350px] lg:w-[700px] h-[60px] flex border-2 border-[#6feec7] items-center overflow-hidden rounded-lg bg-white'>
        <input value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search for a domain' className=' bg-transparent outline-none border-none h-[40px] w-full px-4 text-[18px] py-2 text-[#6feec7] placeholder:text-[#6feec7]' type="text" />
        <div className=' bg-[#6feec7] w-[80px] h-full flex items-center justify-center '>
          <img onClick={handleSearch} className='w-[36px] cursor-pointer text-[#111]' src={serachIcon} alt="" />
        </div>
      </div>

      {/* Text */}

      <div className='text-center flex flex-col gap-6'>
        <p className='text-xl text-white'>Find a great, available domain name for your website in seconds.</p>
        <p className='text-sm'><span className='text-[#6feec7]'>Example : </span>
          {
            keywords.map((keyword, index) => (
              <React.Fragment key={keyword}>
                {index > 0 && ' '}
                <Link className='text-green-300' to={`/search/${keyword}`}>{keyword}</Link>
              </React.Fragment>
            ))
          }
        </p>
      </div>

    </section>
  )
}

export default Home_Section
