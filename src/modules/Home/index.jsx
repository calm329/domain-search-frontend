import { SearchIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomeSection = () => {
  const keywords = [
    'game', 'smart', 'learn', 'iphone', 'web', 'eco', 'yoga', 'fly', 'football', 'shopping', 'party', 'cloud', 'startup', 'photo', 'crypto', 'world', 'seo', 'app', 'help', 'health', 'fun', 'social', 'tech', 'todo', 'blog', 'dating', 'gym', 'running', 'green', 'store', 'sports', 'news', 'stock', 'ai', 'coffee', 
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <section className='w-full flex-1 h-auto min-h-[75vh] font-openSans flex flex-col justify-center items-center gap-8 md:gap-16 bg-[#0D0D15] py-8'>

      {/* Website Name */}
      <h1 className='text-3xl md:text-5xl uppercase font-semibold text-white'>Domain<span className='text-[#6feec7]'>InHand</span></h1>

      {/* Search Box */}
      <div className='w-[90%] max-w-[700px] h-[60px] flex border-2 border-[#6feec7] items-center overflow-hidden rounded-lg bg-white'>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Let's find that domain..."
          className='bg-transparent outline-none border-none text-[#2A2A2A] h-[40px] w-full px-4 text-[18px] py-2 placeholder:text-[#2A2A2A]'
          type="text"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()} // Allow search on enter key press  
        />
        <div className='bg-[#6feec7] w-[80px] h-full flex items-center justify-center cursor-pointer'
          onClick={handleSearch}>
          <SearchIcon size={42} />
        </div>
      </div>

      {/* Text and Keywords */}
      <div className='text-center flex flex-col gap-4 px-5 md:gap-6'>
        <p className='text-lg md:text-xl text-white'>Find the perfect domain name for your blog in seconds.</p>
        <div className='max-w-[800px] flex flex-wrap justify-center items-center gap-1 text-sm'>
          <span className='text-[#6feec7]'>Example: </span>
          {
            keywords.map((keyword, index) => (
              <React.Fragment key={keyword}>
                {index > 0 && ', '}
                <Link className='text-[#6feec7] hover:underline' to={`/search/${keyword}`}>{keyword}</Link>
              </React.Fragment>
            ))
          }
        </div>
      </div>

    </section>
  );
}

export default HomeSection;