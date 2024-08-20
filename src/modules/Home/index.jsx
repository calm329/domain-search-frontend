import React, { useState } from 'react'
import serachIcon from '../../assets/search.svg'
import { Link, useNavigate } from 'react-router-dom'

const HomeSection = () => {
  const keywords = [
    'app', 'blog', 'coffee', 'dating', 'fly', 'football', 'fun', 'game', 'gym', "help", 'iphone', 'mail', 'news', 'note', 'party', 'photo', 'pic', 'running', 'scifi', 'seo', 'shopping', 'sports', 'startup', 'stock', 'store', 'sushi', 'todo', 'web', 'world', 'yoga',
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();


  return (
    <section className='w-full h-[75vh] font-openSans flex justify-center items-center flex-col gap-16 opensans bg-[#0D0D15]'>

      {/* Website Name */}
      <h1 className='text-3xl md:text-5xl uppercase font-semibold text-white'>Domain <span className='text-[#6feec7]'>Search</span></h1>

      {/* Search_box */}

      <div className='w-[350px] lg:w-[700px] h-[60px] flex border-2 border-[#6feec7] items-center overflow-hidden rounded-lg bg-white'>
        <input value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} placeholder="Let's finde that domain..." className=' bg-transparent outline-none border-none text-[#2A2A2A] h-[40px] w-full px-4 text-[18px] py-2 placeholder:text-[#2A2A2A]' type="text" />
        <div className=' bg-[#6feec7] w-[80px] h-full flex items-center justify-center '>
          <img onClick={() => navigate(`/search/${searchTerm}`)} className='w-[36px] cursor-pointer text-[#111]' src={serachIcon} alt="" />
        </div>
      </div>

      {/* Text */}

      <div className='text-center flex flex-col gap-6'>
        <p className='text-xl text-white'>Find perfect domain for your blog in seconds.</p>
        <div className='max-w-[800px] px-5'>
          <p className='text-sm'><span className='text-[#6feec7] text-sm'>Example : </span>
            {
              keywords.map((keyword, index) => (
                <React.Fragment key={keyword}>
                  {index > 0 && ' '}
                  <Link className='text-[#6feec7]' to={`/search/${keyword}`}>{keyword}</Link>
                </React.Fragment>
              ))
            }
          </p>
        </div>
      </div>

    </section>
  )
}

export default HomeSection;