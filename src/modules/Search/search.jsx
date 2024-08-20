import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header/header';
import serachIcon from '../../assets/search.svg';
import Footer from '../../Components/Footer/footer';
import { useParams, useNavigate } from 'react-router-dom';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "../../Components/ui/dialog.jsx";
import { getSuggetion } from '../../lib/search.js';
import { useQuery } from '@tanstack/react-query';


const Search = () => {
    const { keyword } = useParams();
    const trimedKeyword = decodeURIComponent(keyword).replace(/\s+/g, '');
    const { data: suggetionsData } = useQuery({
        queryKey: [`suggetion_${trimedKeyword}`, trimedKeyword],
        queryFn: getSuggetion,
        refetchInterval: 6 * 60 * 60 * 1000
    });

    const [searchResults, setSearchResults] = useState([]);
    const [avaiblity, setAvaiblity] = useState(null);

    const [currentDomain, setCurrentDomain] = useState(null);
    const [currentDomainStatus, setCurrentDomainStatus] = useState(null);
    const navigate = useNavigate();
    const [domain, setDomain] = useState(keyword);

    useEffect(() => {
        if (suggetionsData) {
            setSearchResults(suggetionsData?.extentions || []);
            setCurrentDomainStatus(suggetionsData?.avaiblity || null);
        }
    }, [suggetionsData]);

    // useEffect(() => {
    //     const decodedKeyword = decodeURIComponent(keyword).replace(/\s+/g, '');
    //     setAvaiblity(null);
    //     setSearchResults([]);
    //     if (decodedKeyword) {
    //         performSearch(decodedKeyword);
    //         setDomain(decodedKeyword);
    //     };
    // }, [keyword]);

    useEffect(() => {
        checkAvaiblity(currentDomain)
    }, [currentDomain]);

    const checkAvaiblity = async (term) => {
        try {
            const api_response = await fetch(`${process.env.REACT_APP_SERVER_URL}/domains/check-domain/${term}`);
            const simulatedResults = await api_response.json();
            setCurrentDomainStatus(simulatedResults);
        } catch (error) {
            console.error('Error fetching search results:', error);
        };
    }

    return (
        <div className='w-full min-h-[100vh] max-h-auto  opensans bg-[#0D0D15] '>
            <Header />
            <div className='bg-[#1D1C28] py-8 flex justify-center text-center' >
                <div className='w-[350px] lg:w-[700px] h-[60px] flex items-center overflow-hidden rounded-lg'>
                    <input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder='Search for a domain' className='opensans  bg-transperant outline-none border-none h-[60px] w-full px-4 text-2xl py-2' type="text" />
                    <div onClick={() => navigate(`/search/${domain}`)} className=' bg-[#6feec7] w-[80px] h-full flex items-center justify-center cursor-pointer'>
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

                <p className='text-xl font-semibold text-white'>{domain ? `Search results for ${keyword}` : "Try searching domainss"}</p>

                <div className='mt-10 py-4 max-w-[1000px] w-full px-4'>

                    {avaiblity && avaiblity.map((mainDomain, index) => (
                        <div className='p-5 border border-[#6feec7] border-opacity-25 flex justify-between'>
                            <p className={`${mainDomain.available ? "font-bold text-neutral-100" : "text-neutral-500 line-through font-light"}`}>{mainDomain?.domain}</p>
                            <div className='space-x-3'>
                                {mainDomain.available ?
                                    <a href='https://namecheapreferalurl.com' target="_blank" without rel="noreferrer">
                                        <button className='bg-[#6feec7] rounded-sm px-5 py-2 text-neutral-800'>Register</button>
                                    </a> :
                                    <p className='text-neutral-500 font-light px-5 py-2'>Not Avaiblable</p>}
                            </div>
                        </div>
                    ))}
                </div>

                <ul className='text-white py-4 max-w-[1000px] w-full px-4 mt-6'>
                    {searchResults.map((result, index) => (
                        <li className='p-5 border border-[#6feec7] border-opacity-25 capitalize flex justify-between' key={index}>
                            <div className='flex'>
                                {result.endsWith("$") && <p className='capitalize font-bold text-neutral-100'>{result.replace(/[\^$]/g, "")}</p>}
                                <p className='capitalize text-neutral-300 font-light'>{domain}</p>
                                {result.startsWith("$") && <p className='capitalize font-bold text-neutral-100'>{result.replace(/[\^$]/g, "")}</p>}
                            </div>
                            <div className='space-x-3'>
                                <Dialog>
                                    <DialogTrigger onClick={() => setCurrentDomain(result.replace(/[\^$]/g, domain))} className='hover:bg-[#6feec7] hover:bg-opacity-15 rounded-sm px-2 py-1 text-sm text-neutral-300'>
                                        .com
                                    </DialogTrigger>
                                    <DialogContent className="bg-neutral-900 text-neutral-100 border-neutral-700 ring-0">
                                        <DialogHeader>
                                            <DialogTitle className="text-center">{domain}.com</DialogTitle>
                                            <DialogDescription className="pt-5 text-center text-base text-neutral-300">
                                                {currentDomainStatus?.available && <span>{currentDomain}.com is still avaiblable</span>}
                                                {(currentDomainStatus && (currentDomainStatus.available == false)) &&
                                                    <span className='text-red-500'>{currentDomain}.com is not avaiblable</span>}
                                            </DialogDescription>
                                        </DialogHeader>

                                        {currentDomainStatus?.available && <DialogFooter className={"sm:justify-center mt-5"}>
                                            <button className='bg-[#6feec7] rounded-sm px-5 py-2 text-neutral-800'>Register</button>
                                        </DialogFooter>}
                                    </DialogContent>
                                </Dialog>

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
