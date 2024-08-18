import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header/header';
import serachIcon from '../../assets/search.svg';
import Footer from '../../Components/Footer/footer';
import { useParams, useNavigate } from 'react-router-dom';

const Search = () => {
    const [domain, setDomain] = useState('')
    const [searchResults, setSearchResults] = useState([]);
    const { keyword } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const decodedKeyword = decodeURIComponent(keyword);
        if (decodedKeyword) {
            performSearch(decodedKeyword);
        }
    }, []);

    const performSearch = async (term) => {
        const trimmedTerm = term.trim();
        if (trimmedTerm === '') {
            return;
        }

        try {
            const api_response = await fetch(`${process.env.REACT_APP_SERVER_URL}/domains/search-suggestions?keyword=${trimmedTerm}`);
            const simulatedResults = await api_response.json();
            setSearchResults(simulatedResults);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div className='w-full min-h-[100vh] max-h-auto  opensans bg-[#0D0D15] '>
            <Header />
            <div className='bg-[#1D1C28] py-8 flex justify-center text-center' >
                <div className='w-[350px] lg:w-[700px] h-[60px] flex items-center overflow-hidden rounded-lg'>
                    <input value={keyword} placeholder='Search for a domain' className='opensans  bg-transperant outline-none border-none h-[60px] w-full px-4 text-2xl py-2' type="text" />
                    <div className=' bg-[#6feec7] w-[80px] h-full flex items-center justify-center '>
                        <img className='w-[36px] text-[#111]' src={serachIcon} alt="" />
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
                <ul className='text-white py-4 max-w-[1000px] w-full px-4'>
                    {searchResults.map((result, index) => (
                        <li className='p-5 border border-[#6feec7] border-opacity-25 capitalize flex justify-between' key={index}>
                            <p>
                                {result.startsWith("$") && <span className='font-bold text-neutral-100'>{result.replace(/[\^$]/g, "")}</span>}
                                <span className='text-neutral-300 font-light'>{keyword}</span>
                                {result.endsWith("$") && <span className='font-bold text-neutral-100'>{result.replace(/[\^$]/g, "")}</span>}
                            </p>
                            <div className='space-x-3'>
                                <button className='hover:bg-[#6feec7] hover:bg-opacity-15 rounded-sm px-2 py-1 text-sm text-neutral-300'>.com</button>
                                <button className='hover:bg-[#6feec7] hover:bg-opacity-15 rounded-sm px-2 py-1 text-sm text-neutral-300'>.blog</button>
                            </div>
                        </li>
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
