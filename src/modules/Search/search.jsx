import React, { useState, useEffect } from 'react'
import Header from '../../Components/Header/header'
import serachIcon from '../../assets/search.svg'
import Footer from '../../Components/Footer/footer'
import { useParams, useNavigate } from 'react-router-dom'

const Search = () => {

    const [domain, setDomain] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const { keyword } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (keyword) {
            setDomain(keyword);
            setDomain(decodeURIComponent(keyword));
            performSearch(decodeURIComponent(keyword));
        }
    }, [keyword]);

    const handleInputChange = (e) => {
        e.preventDefault();
        setDomain(e.target.value);
        // Implement your search logic here
        console.log('Searching for:', domain);
        if (domain.trim()) {
            navigate(`/search/${encodeURIComponent(domain.trim())}`);
            performSearch(searchResults.trim());
        }
        const newSearchTerm = e.target.value;
        setSearchResults(newSearchTerm);
    
    // Update URL without triggering a page reload
    navigate(`/search/${encodeURIComponent(newSearchTerm)}`, { replace: true });
    
    // Perform search as user types
    performSearch(newSearchTerm);
    };

    const performSearch = (term) => {
        const trimmedTerm = term.trim();
  if (trimmedTerm === '') {
    setSearchResults([]);
    return;
  }
        // This is where you would typically make an API call
        // For this example, we'll just simulate some results
        const simulatedResults = [
            `${term}.com`,
            `${term}online.com`,
            `my${term}.com`,
            `${term}hub.com`,
            `${term}zone.com`,
        ];
        setSearchResults(simulatedResults);
    };

    return (
        <div className='w-full min-h-[100vh] max-h-auto  opensans bg-[#0D0D15] '>
            <Header />
            <div className='bg-[#1D1C28] py-8 flex justify-center text-center' >
                <div className='w-[350px] lg:w-[700px] h-[60px] flex items-center overflow-hidden rounded-lg'>
                    <input onChange={(e) => setDomain(e.target.value)} value={domain} placeholder='Search for a domain' className='opensans  bg-transperant outline-none border-none h-[60px] w-full px-4 text-2xl py-2' type="text" />
                    <div className=' bg-[#6feec7] w-[80px] h-full flex items-center justify-center '>
                        <img onClick={handleInputChange} className='w-[36px] text-[#111]' src={serachIcon} alt="" />
                    </div>
                </div>
            </div>
            <div className='w-full h-20 flex justify-center items-center gap-4 border-b text-white border-[#5a5a5a]'>
                <p>Sort Results</p>
                <select className='h-10 opensans outline-none px-2  bg-[#6feec7] rounded-lg'>
                    <option value="">Popularity</option>
                    <option value="">Length</option>
                    <option value="">Alphabetical</option>
                </select>
                <p>Search Term Filter</p>
                <select className='h-10 opensans outline-none px-2 bg-[#6feec7] rounded-lg'>
                    <option value="all">All</option>
                    <option value="">Starts with term</option>
                    <option value="">Ends with term</option>
                </select>
            </div>
            <div className='flex  min-h-[45vh] max-h-auto items-center my-8 flex-col'>

                <p className='text-xl font-semibold text-white'>{domain ? `Search results for ${domain}` : "Try searching domainss"}</p>
                <ul className='text-white py-4'>
                    {searchResults.map((result, index) => (
                        <li key={index}>{result}</li>
                    ))}
                </ul>
            </div>
            <div>

            </div>
            <Footer />
        </div>
    )
}

export default Search
